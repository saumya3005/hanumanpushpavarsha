"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { suggestHindiName } from "@/lib/hindi-name";
import { MainMember, mainMemberRoles } from "@/lib/main-members";

const bucket = 'main-member-photos';
const inputStyle = 'mt-1 w-full rounded-lg border border-zinc-700 bg-black px-3 py-2 text-white';

function errorMessage(error: unknown): string {
    const e = error as { code?: string; message?: string };
    if (e.code === 'PGRST205') return 'Main Members setup is pending. Run create-main-members.sql in Supabase SQL Editor, then Refresh.';
    if (e.code === '42501' || e.code === 'PGRST116') return 'Your account could not update this member. Check Main Members admin access and refresh.';
    return e.message || 'Unable to save. Check your connection and try again.';
}

export function MainMembersAdmin() {
    const [members, setMembers] = useState<MainMember[]>([]);
    const [draft, setDraft] = useState<MainMember | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState('');
    const [manualHindi, setManualHindi] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (!file) { setPreview(''); return; }
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    async function load() {
        setLoading(true);
        setError('');
        try {
            const { data, error } = await supabase.from('main_members').select('*').order('display_order').order('id');
            if (error) throw error;
            setMembers(data || []);
        } catch (e) { setError(errorMessage(e)); }
        finally { setLoading(false); }
    }
    useEffect(() => { void load(); }, []);

    async function save(e: React.FormEvent) {
        e.preventDefault();
        if (!draft || saving) return;
        setError(''); setSuccess('');
        if (![draft.name_en, draft.name_hi, draft.role_en, draft.role_hi].every(v => v.trim()) || !Number.isInteger(draft.display_order) || draft.display_order < 0 || draft.display_order > 2147483647) {
            setError('Enter both names, designations, and a valid whole-number display order.'); return;
        }
        setSaving(true);
        let uploadedPath: string | null = null;
        let committed = false;
        try {
            let photo_url = draft.photo_url;
            let photo_path = draft.photo_path;
            if (file) {
                const ext = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' }[file.type];
                if (!ext || file.size > 5 * 1024 * 1024) throw new Error('Choose a JPG, PNG or WebP image up to 5 MB.');
                const path = `${draft.id}/${crypto.randomUUID()}.${ext}`;
                const { error } = await supabase.storage.from(bucket).upload(path, file, { contentType: file.type });
                if (error) throw error;
                uploadedPath = path;
                photo_path = path;
                photo_url = supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
            }
            const { data, error } = await supabase.from('main_members').update({
                name_en: draft.name_en.trim(), name_hi: draft.name_hi.trim(),
                role_key: draft.role_key, role_en: draft.role_en.trim(), role_hi: draft.role_hi.trim(),
                description_en: draft.description_en.trim(), description_hi: draft.description_hi.trim(),
                phone: draft.phone.trim(), display_order: draft.display_order,
                photo_url, photo_path, updated_at: new Date().toISOString(),
            }).eq('id', draft.id).select('*').single();
            if (error) throw error;
            committed = true;
            setMembers(current => current.map(m => m.id === data.id ? data : m).sort((a, b) => a.display_order - b.display_order || a.id.localeCompare(b.id)));
            setDraft(null); setFile(null);
            setSuccess('Member saved. Refresh the public Members page to see the changes.');
            if (uploadedPath && draft.photo_path) {
                const { error: cleanupError } = await supabase.storage.from(bucket).remove([draft.photo_path]);
                if (cleanupError) setSuccess('Member saved. The previous photo could not be removed from storage.');
            }
        } catch (e) {
            setError(errorMessage(e));
            if (uploadedPath && !committed) await supabase.storage.from(bucket).remove([uploadedPath]);
        } finally { setSaving(false); }
    }

    return <section className="space-y-6">
        <div className="flex items-center justify-between"><h2 className="text-2xl font-bold">Main Members</h2><button disabled={saving || loading} onClick={load} className="text-orange-400 disabled:opacity-50">Refresh</button></div>
        {error && <p role="alert" className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-red-400">{error}</p>}
        {success && <p role="status" className="text-green-400">{success}</p>}
        {loading ? <p>Loading main members...</p> : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{members.map(member => <article key={member.id} className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={member.photo_url} alt={member.name_en} className="mb-3 h-24 w-24 rounded-full object-cover" />
            <h3 className="font-bold">{member.name_en}</h3><p className="text-sm text-orange-400">{member.role_en}</p>
            <button disabled={saving} className="mt-4 rounded bg-orange-500 px-4 py-2 text-sm disabled:opacity-50" onClick={() => { setDraft({ ...member }); setFile(null); setManualHindi(false); setError(''); setSuccess(''); }}>Edit {member.role_en}</button>
        </article>)}</div>}
        {!loading && !error && !members.length && <p>No main members found. Run the Main Members setup to restore the initial five members.</p>}
        {draft && <form onSubmit={save} className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
            <h3 className="mb-4 text-xl font-bold">Edit Main Member</h3>
            <fieldset disabled={saving} className="grid gap-4 md:grid-cols-2 disabled:opacity-60">
                <label>Name (English)<input required className={inputStyle} value={draft.name_en} onChange={e => setDraft({ ...draft, name_en: e.target.value, name_hi: manualHindi ? draft.name_hi : suggestHindiName(e.target.value, members) })} /></label>
                <label>Name (Hindi) — auto-filled<input required className={inputStyle} value={draft.name_hi} onChange={e => { setManualHindi(true); setDraft({ ...draft, name_hi: e.target.value }); }} /><button type="button" className="mt-1 text-xs text-orange-400" onClick={() => { setManualHindi(false); setDraft({ ...draft, name_hi: suggestHindiName(draft.name_en, members) }); }}>Use automatic Hindi</button></label>
                <label>Position / category<select className={inputStyle} value={draft.role_key} onChange={e => { const role = mainMemberRoles.find(r => r[0] === e.target.value)!; setDraft({ ...draft, role_key: role[0], role_en: role[1], role_hi: role[2] }); }}>{mainMemberRoles.map(r => <option key={r[0]} value={r[0]}>{r[1]}</option>)}</select></label>
                <label>Display order<input required type="number" min="0" max="2147483647" step="1" className={inputStyle} value={draft.display_order} onChange={e => setDraft({ ...draft, display_order: e.target.valueAsNumber })} /></label>
                <label>Designation (English)<input required className={inputStyle} value={draft.role_en} onChange={e => setDraft({ ...draft, role_en: e.target.value })} /></label>
                <label>Designation (Hindi)<input required className={inputStyle} value={draft.role_hi} onChange={e => setDraft({ ...draft, role_hi: e.target.value })} /></label>
                <label>Description (English)<textarea rows={3} className={inputStyle} value={draft.description_en} onChange={e => setDraft({ ...draft, description_en: e.target.value })} /></label>
                <label>Description (Hindi)<textarea rows={3} className={inputStyle} value={draft.description_hi} onChange={e => setDraft({ ...draft, description_hi: e.target.value })} /></label>
                <label>Phone<input type="tel" className={inputStyle} value={draft.phone} onChange={e => setDraft({ ...draft, phone: e.target.value })} /></label>
                <label>Photo (JPG, PNG, WebP; max 5 MB)<input key={draft.id} type="file" accept="image/jpeg,image/png,image/webp" className={inputStyle} onChange={e => { setError(''); const selected = e.target.files?.[0]; if (selected && (!['image/jpeg','image/png','image/webp'].includes(selected.type) || selected.size > 5 * 1024 * 1024)) { setError('Choose a JPG, PNG or WebP image up to 5 MB.'); e.target.value = ''; setFile(null); return; } setFile(selected || null); }} /></label>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview || draft.photo_url} alt="Photo preview" className="h-32 w-32 rounded-full object-cover" />
                <div className="flex items-center gap-4"><button className="rounded-lg bg-orange-500 px-5 py-2 font-semibold" type="submit">{saving ? 'Saving...' : 'Save Changes'}</button><button type="button" onClick={() => { setDraft(null); setFile(null); }}>Cancel</button></div>
            </fieldset>
        </form>}
    </section>;
}

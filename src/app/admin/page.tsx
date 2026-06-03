"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const adminCards = [
    "Gallery Management",
    "Live Event Control",
    "Members Management",
    "Donation Records",
];

export default function AdminPage() {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");
    const [authLoading, setAuthLoading] = useState(false);

    const [activeModule, setActiveModule] = useState<string | null>(null);

    // Live Event specific state
    const [liveEventId, setLiveEventId] = useState<string | null>(null);
    const [liveTitle, setLiveTitle] = useState("");
    const [liveDescription, setLiveDescription] = useState("");
    const [liveUrl, setLiveUrl] = useState("");
    const [livePlatform, setLivePlatform] = useState("youtube");
    const [isLive, setIsLive] = useState(false);
    const [liveError, setLiveError] = useState("");
    const [liveSuccess, setLiveSuccess] = useState("");
    const [liveLoading, setLiveLoading] = useState(false);

    // Gallery specific state
    const [albums, setAlbums] = useState<any[]>([]);
    const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
    const [photos, setPhotos] = useState<any[]>([]);
    const [albumTitle, setAlbumTitle] = useState("");
    const [albumYear, setAlbumYear] = useState("");
    const [uploading, setUploading] = useState(false);
    const [galleryError, setGalleryError] = useState("");
    const [gallerySuccess, setGallerySuccess] = useState("");

    // Members specific state
    const [members, setMembers] = useState<any[]>([]);
    const [membersLoading, setMembersLoading] = useState(false);
    const [membersSearch, setMembersSearch] = useState("");
    const [membersError, setMembersError] = useState("");
    const [membersSuccess, setMembersSuccess] = useState("");

    // Donation specific state
    const [donations, setDonations] = useState<any[]>([]);
    const [donationsLoading, setDonationsLoading] = useState(false);
    const [donationsSearch, setDonationsSearch] = useState("");
    const [donationsError, setDonationsError] = useState("");

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (activeModule === "Gallery Management") {
            fetchAlbums();
        } else if (activeModule === "Live Event Control") {
            fetchLiveSettings();
        } else if (activeModule === "Members Management") {
            fetchMembers();
        } else if (activeModule === "Donation Records") {
            fetchDonations();
        }
    }, [activeModule]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthLoading(true);
        setAuthError("");

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setAuthError(error.message);
        }
        setAuthLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    const fetchMembers = async () => {
        setMembersLoading(true);
        setMembersError("");
        const { data, error } = await supabase.from("join_members").select("*").order("created_at", { ascending: false });
        if (error) {
            console.error("Supabase fetch error (join_members):", error);
            setMembersError(error.message);
        } else {
            setMembers(data || []);
        }
        setMembersLoading(false);
    };

    const handleUpdateMemberStatus = async (
        id: string,
        newStatus: string
    ) => {
        setMembersError("");
        setMembersSuccess("");

        const { error } = await supabase
            .from("join_members")
            .update({
                member_status: newStatus,
            })
            .eq("id", id);

        if (error) {
            console.error(
                "Supabase update error (join_members status):",
                error
            );
            setMembersError(error.message);
        } else {
            setMembersSuccess(
                `Member status updated to ${newStatus}.`
            );

            fetchMembers();
        }
    };

    const handleToggleLeadMember = async (id: string, isLead: boolean) => {
        setMembersError("");
        setMembersSuccess("");
        const { error } = await supabase.from("join_members").update({ is_lead_member: isLead }).eq("id", id);
        if (error) {
            console.error("Supabase update error (join_members is_lead):", error);
            setMembersError(error.message);
        } else {
            setMembersSuccess(`Member is ${isLead ? 'now a Lead Member' : 'no longer a Lead Member'}.`);
            fetchMembers();
        }
    };

    const handleDeleteMember = async (member: any) => {
        setMembersError("");
        setMembersSuccess("");

        if (member.photo_path) {
            const { error: storageError } = await supabase.storage.from("member-photos").remove([member.photo_path]);
            if (storageError) console.error("Supabase storage remove error:", storageError);
        }

        const { error } = await supabase.from("join_members").delete().eq("id", member.id);
        if (error) {
            console.error("Supabase delete error (join_members):", error);
            setMembersError(error.message);
        } else {
            setMembersSuccess("Member deleted successfully.");
            fetchMembers();
        }
    };

    const fetchDonations = async () => {
        setDonationsLoading(true);
        setDonationsError("");
        const { data, error } = await supabase.from("donations").select("*").order("created_at", { ascending: false });
        if (error) {
            console.error("Supabase fetch error (donations):", error);
            setDonationsError(error.message);
        } else {
            setDonations(data || []);
        }
        setDonationsLoading(false);
    };

    const fetchLiveSettings = async () => {
        setLiveError("");
        const { data, error } = await supabase.from("live_event_settings").select("*").limit(1).single();
        if (error && error.code !== "PGRST116") {
            setLiveError(error.message);
        } else if (data) {
            setLiveEventId(data.id);
            setLiveTitle(data.title || "");
            setLiveDescription(data.description || "");
            setLiveUrl(data.live_url || "");
            setIsLive(data.is_live || false);

            if (data.live_url?.includes("instagram.com")) setLivePlatform("instagram");
            else if (data.live_url?.includes("facebook.com")) setLivePlatform("facebook");
            else setLivePlatform("youtube");
        }
    };

    const handleSaveLiveSettings = async (e: React.FormEvent) => {
        e.preventDefault();
        setLiveError("");
        setLiveSuccess("");
        setLiveLoading(true);

        const payload = {
            title: liveTitle,
            description: liveDescription,
            live_url: liveUrl,
            is_live: isLive,
            updated_at: new Date().toISOString()
        };

        if (liveEventId) {
            const { error } = await supabase.from("live_event_settings").update(payload).eq("id", liveEventId);
            if (error) setLiveError(error.message);
            else setLiveSuccess("Live event settings updated successfully.");
        } else {
            const { data, error } = await supabase.from("live_event_settings").insert([payload]).select().single();
            if (error) setLiveError(error.message);
            else {
                if (data) setLiveEventId(data.id);
                setLiveSuccess("Live event settings created successfully.");
            }
        }
        setLiveLoading(false);
    };

    const handleToggleLive = async () => {
        const newValue = !isLive;
        setIsLive(newValue);
        if (liveEventId) {
            setLiveError("");
            setLiveSuccess("");
            const { error } = await supabase.from("live_event_settings").update({ is_live: newValue, updated_at: new Date().toISOString() }).eq("id", liveEventId);
            if (error) {
                setLiveError(error.message);
                setIsLive(!newValue); // revert
            } else {
                setLiveSuccess(newValue ? "Stream is now LIVE" : "Stream is now OFFLINE");
            }
        }
    };

    const fetchAlbums = async () => {
        const { data, error } = await supabase.from("gallery_albums").select("*").order("created_at", { ascending: false });
        if (error) setGalleryError(error.message);
        else setAlbums(data || []);
    };

    const fetchPhotos = async (albumId: string) => {
        const { data, error } = await supabase.from("gallery_photos").select("*").eq("album_id", albumId).order("created_at", { ascending: false });
        if (error) setGalleryError(error.message);
        else setPhotos(data || []);
    };

    const handleCreateAlbum = async (e: React.FormEvent) => {
        e.preventDefault();
        setGalleryError("");
        setGallerySuccess("");
        const { error } = await supabase.from("gallery_albums").insert([{ title: albumTitle, year: albumYear }]);
        if (error) {
            console.error("Supabase insert error (gallery_albums):", error);
            setGalleryError(error.message);
        } else {
            setGallerySuccess(`Album "${albumTitle}" created successfully!`);
            setAlbumTitle("");
            setAlbumYear("");
            fetchAlbums();
        }
    };

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !selectedAlbum) return;
        setUploading(true);
        setGalleryError("");
        setGallerySuccess("");

        let successCount = 0;
        let failCount = 0;

        for (const file of Array.from(e.target.files)) {
            const fileExt = file.name.split('.').pop();
            const safeName = Math.random().toString(36).substring(2, 15);
            const fileName = `${Date.now()}-${safeName}.${fileExt}`;

            const { error: uploadError } = await supabase.storage.from("gallery-photos").upload(fileName, file);

            if (uploadError) {
                console.error("Supabase storage upload error:", uploadError);
                setGalleryError(uploadError.message);
                failCount++;
                continue;
            }

            const { data } = supabase.storage.from("gallery-photos").getPublicUrl(fileName);

            if (data?.publicUrl) {
                const { error: dbError } = await supabase.from("gallery_photos").insert([{
                    album_id: selectedAlbum.id,
                    image_url: data.publicUrl,
                    image_path: fileName,
                    caption: ""
                }]);

                if (dbError) {
                    console.error("Supabase insert error (gallery_photos):", dbError);
                    setGalleryError(dbError.message);
                    failCount++;
                } else {
                    successCount++;
                }
            }
        }

        if (successCount > 0) {
            setGallerySuccess(`Successfully uploaded ${successCount} photo(s).`);
        }
        if (failCount > 0) {
            setGalleryError(prev => prev + ` (Failed to upload ${failCount} photo(s))`);
        }

        setUploading(false);
        fetchPhotos(selectedAlbum.id);

        // Reset file input
        e.target.value = '';
    };

    const handleDeletePhoto = async (photo: any) => {
        setGalleryError("");
        setGallerySuccess("");

        let fileName = photo.image_path;
        if (!fileName) {
            const urlParts = photo.image_url.split("/");
            fileName = urlParts[urlParts.length - 1];
        }

        const { error: storageError } = await supabase.storage.from("gallery-photos").remove([fileName]);
        if (storageError) {
            console.error("Supabase storage remove error:", storageError);
            setGalleryError(storageError.message);
            return;
        }

        const { error: dbError } = await supabase.from("gallery_photos").delete().eq("id", photo.id);

        if (dbError) {
            console.error("Supabase delete error (gallery_photos):", dbError);
            setGalleryError(dbError.message);
        } else {
            setGallerySuccess("Photo deleted successfully.");
            fetchPhotos(selectedAlbum.id);
        }
    };

    const handleDeleteAlbum = async (album: any) => {
        if (!confirm(`Are you sure you want to delete the empty album "${album.title}"?`)) return;
        
        setGalleryError("");
        setGallerySuccess("");
        
        const { data: albumPhotos, error: fetchPhotosError } = await supabase.from("gallery_photos").select("id").eq("album_id", album.id);
        
        if (fetchPhotosError) {
            console.error("Supabase fetch error (gallery_photos):", fetchPhotosError);
            setGalleryError(fetchPhotosError.message);
            return;
        }

        if (albumPhotos && albumPhotos.length > 0) {
            setGalleryError("Please delete all photos first before deleting the album.");
            return;
        }
        
        const { error: deleteAlbumError } = await supabase.from("gallery_albums").delete().eq("id", album.id);
        if (deleteAlbumError) {
            console.error("Supabase delete error (gallery_albums):", deleteAlbumError);
            setGalleryError(deleteAlbumError.message);
            return;
        }
        
        setGallerySuccess("Empty album deleted successfully.");
        if (selectedAlbum?.id === album.id) {
            setSelectedAlbum(null);
            setPhotos([]);
        }
        fetchAlbums();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="animate-pulse text-orange-500">Loading admin data...</div>
            </div>
        );
    }

    if (!session) {
        return (
            <main className="min-h-screen bg-black px-6 py-32 text-white flex items-center justify-center">
                <div className="w-full max-w-md bg-zinc-950 p-8 rounded-2xl border border-orange-500/30 shadow-lg">
                    <h1 className="mb-6 text-center text-3xl font-bold text-orange-500">
                        Admin Login
                    </h1>

                    {authError && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
                            {authError}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 bg-black border border-zinc-800 rounded-lg focus:outline-none focus:border-orange-500 text-white transition-colors"
                                placeholder="admin@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 bg-black border border-zinc-800 rounded-lg focus:outline-none focus:border-orange-500 text-white transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={authLoading}
                            className="w-full mt-6 rounded-lg bg-orange-500 px-5 py-2 font-semibold text-white hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            {authLoading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black px-6 py-32 text-white">
            <div className="mx-auto max-w-6xl">
                <div className="mb-6">
                    <Link href="/" className="text-sm font-semibold text-gray-400 hover:text-saffron transition inline-flex items-center gap-2">
                        ← Back to Website
                    </Link>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-zinc-800 pb-8">
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-3">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-400">
                            {activeModule ? `${activeModule}` : "Manage website content, members, donations, gallery, and live events."}
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        {activeModule && (
                            <button
                                onClick={() => setActiveModule(null)}
                                className="rounded-full border border-gray-600 px-6 py-2 text-sm font-semibold text-gray-300 hover:bg-gray-800 transition"
                            >
                                Back to Dashboard
                            </button>
                        )}
                        <button
                            onClick={handleLogout}
                            className="rounded-full border border-orange-500/50 px-6 py-2 text-sm font-semibold text-orange-500 hover:bg-orange-500 hover:text-white transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {activeModule === null && (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {adminCards.map((card) => (
                            <div
                                key={card}
                                className="rounded-2xl border border-orange-500/30 bg-zinc-950 p-6 shadow-lg transition hover:border-orange-500 hover:shadow-orange-500/20 flex flex-col"
                            >
                                <h2 className="text-xl font-semibold text-orange-400">
                                    {card}
                                </h2>

                                <p className="mt-3 mb-6 text-sm text-gray-400 grow">
                                    Manage {card.toLowerCase()} from this dashboard.
                                </p>

                                <button
                                    onClick={() => setActiveModule(card)}
                                    className="self-start rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition"
                                >
                                    Open
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {activeModule === "Gallery Management" && (
                    <div className="space-y-8">
                        {galleryError && (
                            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
                                {galleryError}
                            </div>
                        )}
                        {gallerySuccess && (
                            <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-500 text-sm">
                                {gallerySuccess}
                            </div>
                        )}

                        <div className="grid gap-8 lg:grid-cols-3">
                            <div className="lg:col-span-1 space-y-6">
                                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-lg">
                                    <h3 className="text-xl font-bold text-white mb-4">Create Album</h3>
                                    <form onSubmit={handleCreateAlbum} className="space-y-4">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Album Title</label>
                                            <input
                                                type="text"
                                                value={albumTitle}
                                                onChange={(e) => setAlbumTitle(e.target.value)}
                                                required
                                                className="w-full px-4 py-2 bg-black border border-zinc-800 rounded-lg focus:outline-none focus:border-orange-500 text-white"
                                                placeholder="e.g. Diwali 2026"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Year</label>
                                            <input
                                                type="text"
                                                value={albumYear}
                                                onChange={(e) => setAlbumYear(e.target.value)}
                                                required
                                                className="w-full px-4 py-2 bg-black border border-zinc-800 rounded-lg focus:outline-none focus:border-orange-500 text-white"
                                                placeholder="e.g. 2026"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition"
                                        >
                                            Create Album
                                        </button>
                                    </form>
                                </div>

                                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-lg">
                                    <h3 className="text-xl font-bold text-white mb-4">Albums</h3>
                                    <div className="space-y-2">
                                        {albums.map((album) => (
                                            <div key={album.id} className="relative group flex flex-col">
                                                <button
                                                    onClick={() => {
                                                        setSelectedAlbum(album);
                                                        fetchPhotos(album.id);
                                                    }}
                                                    className={`w-full text-left px-4 py-3 rounded-lg border transition pr-10 ${selectedAlbum?.id === album.id ? "bg-orange-500/20 border-orange-500 text-orange-400" : "bg-black border-zinc-800 text-gray-400 hover:border-gray-500"}`}
                                                >
                                                    <div className="font-semibold">{album.title}</div>
                                                    <div className="text-xs opacity-75">{album.year}</div>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteAlbum(album)}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-red-500 bg-transparent hover:bg-red-500/10 rounded-md transition"
                                                    title="Delete Album"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                        {albums.length === 0 && <div className="text-sm text-gray-500">No albums found.</div>}
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-2 space-y-6">
                                {selectedAlbum ? (
                                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-lg">
                                        <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
                                            <h3 className="text-xl font-bold text-white">
                                                Photos: {selectedAlbum.title}
                                            </h3>
                                            <label className={`cursor-pointer rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                                {uploading ? 'Uploading...' : 'Upload Photos'}
                                                <input
                                                    type="file"
                                                    multiple
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handlePhotoUpload}
                                                    disabled={uploading}
                                                />
                                            </label>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {photos.map((photo) => (
                                                <div key={photo.id} className="relative group rounded-lg overflow-hidden border border-zinc-800 bg-black aspect-square">
                                                    <img src={photo.image_url} alt="" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                                        <button
                                                            onClick={() => handleDeletePhoto(photo)}
                                                            className="bg-red-500 text-white px-3 py-1 text-xs rounded-full font-semibold hover:bg-red-600 transition"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            {photos.length === 0 && (
                                                <div className="col-span-full py-12 text-center text-gray-500 text-sm">
                                                    No photos uploaded yet for this album.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-12 shadow-lg text-center flex flex-col items-center justify-center h-full min-h-75">
                                        <p className="text-gray-400">Select an album from the left to view and upload photos.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeModule === "Live Event Control" && (
                    <div className="space-y-8">
                        {liveError && (
                            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
                                {liveError}
                            </div>
                        )}
                        {liveSuccess && (
                            <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-500 text-sm">
                                {liveSuccess}
                            </div>
                        )}

                        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-lg max-w-2xl mx-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-white">Live Status</h3>
                                <button
                                    onClick={handleToggleLive}
                                    className={`px-6 py-2 rounded-full font-bold transition flex items-center gap-2 ${isLive ? 'bg-red-500 text-white animate-pulse' : 'bg-zinc-800 text-gray-400'}`}
                                >
                                    <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-white' : 'bg-gray-500'}`} />
                                    {isLive ? 'LIVE NOW' : 'OFFLINE'}
                                </button>
                            </div>

                            <form onSubmit={handleSaveLiveSettings} className="space-y-6">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Live Stream Title</label>
                                    <input
                                        type="text"
                                        value={liveTitle}
                                        onChange={(e) => setLiveTitle(e.target.value)}
                                        className="w-full px-4 py-2 bg-black border border-zinc-800 rounded-lg focus:outline-none focus:border-orange-500 text-white"
                                        placeholder="e.g., Maha Aarti 2026"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Description (Optional)</label>
                                    <textarea
                                        value={liveDescription}
                                        onChange={(e) => setLiveDescription(e.target.value)}
                                        className="w-full px-4 py-2 bg-black border border-zinc-800 rounded-lg focus:outline-none focus:border-orange-500 text-white h-24"
                                        placeholder="Add a short description about this live stream..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Platform</label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="platform" value="youtube" checked={livePlatform === "youtube"} onChange={() => setLivePlatform("youtube")} className="accent-orange-500" />
                                            <span className="text-gray-300 text-sm">YouTube Live</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="platform" value="facebook" checked={livePlatform === "facebook"} onChange={() => setLivePlatform("facebook")} className="accent-orange-500" />
                                            <span className="text-gray-300 text-sm">Facebook Live</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="platform" value="instagram" checked={livePlatform === "instagram"} onChange={() => setLivePlatform("instagram")} className="accent-orange-500" />
                                            <span className="text-gray-300 text-sm">Instagram Live</span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">
                                        {livePlatform === "instagram" ? "Instagram Live/Profile Link" : "YouTube/Facebook Embed URL"}
                                    </label>
                                    <input
                                        type="url"
                                        value={liveUrl}
                                        onChange={(e) => setLiveUrl(e.target.value)}
                                        required
                                        className="w-full px-4 py-2 bg-black border border-zinc-800 rounded-lg focus:outline-none focus:border-orange-500 text-white"
                                        placeholder={livePlatform === "instagram" ? "e.g., https://instagram.com/yourprofile" : "e.g., https://www.youtube.com/embed/XXXXXXX"}
                                    />
                                    {livePlatform === "instagram" && (
                                        <p className="text-xs text-gray-500 mt-2">Instagram Live streams cannot be embedded directly. Users will see a redirect button.</p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={liveLoading}
                                    className="w-full rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white hover:bg-orange-600 transition disabled:opacity-50 mt-4"
                                >
                                    {liveLoading ? 'Saving...' : 'Save Live Settings'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {activeModule === "Members Management" && (
                    <div className="space-y-6">
                        {membersError && (
                            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
                                {membersError}
                            </div>
                        )}
                        {membersSuccess && (
                            <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-500 text-sm">
                                {membersSuccess}
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                            <input
                                type="text"
                                placeholder="Search by name, email, phone, city, state..."
                                value={membersSearch}
                                onChange={(e) => setMembersSearch(e.target.value)}
                                className="w-full sm:max-w-md px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-orange-500 text-white"
                            />
                        </div>

                        {membersLoading ? (
                            <div className="text-center py-12 text-gray-500">Loading members...</div>
                        ) : (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {members
                                    .filter(m => {
                                        const nameStr = (m.first_name ? `${m.first_name} ${m.last_name}` : m.full_name || m.name || "").toLowerCase();
                                        const emailStr = (m.email || "").toLowerCase();
                                        const phoneStr = (m.phone_number || m.phone || "").toLowerCase();
                                        const cityStr = (m.city || "").toLowerCase();
                                        const stateStr = (m.state || "").toLowerCase();
                                        const q = membersSearch.toLowerCase();
                                        return nameStr.includes(q) || emailStr.includes(q) || phoneStr.includes(q) || cityStr.includes(q) || stateStr.includes(q);
                                    })
                                    .map(member => {
                                        const displayName = member.first_name ? `${member.first_name} ${member.last_name}` : member.full_name || member.name || "Unknown Member";
                                        const displayPhone = member.phone_number || member.phone || "N/A";
                                        const displayPaymentStatus = member.payment_status || "Unknown";
                                        const displayStatus = member.member_status || member.status || "Pending";
                                        const initials = displayName.substring(0, 2).toUpperCase();

                                        return (
                                            <div key={member.id} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-lg flex flex-col gap-4">
                                                <div className="flex items-start gap-4">
                                                    {member.photo_url ? (
                                                        <img src={member.photo_url} alt={displayName} className="w-16 h-16 rounded-full object-cover border border-zinc-800" />
                                                    ) : (
                                                        <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-gray-500 text-xl font-bold tracking-widest">
                                                            {initials}
                                                        </div>
                                                    )}
                                                    <div className="grow">
                                                        <h3 className="text-lg font-bold text-white leading-tight">
                                                            {displayName}
                                                        </h3>
                                                        <p className="text-xs text-gray-400 mt-1">{member.city || 'N/A'}, {member.state || 'N/A'}</p>
                                                    </div>
                                                </div>
                                                <div className="text-sm text-gray-300 space-y-1">
                                                    <div><span className="text-gray-500">Email:</span> {member.email || 'N/A'}</div>
                                                    <div><span className="text-gray-500">Phone:</span> {displayPhone}</div>
                                                    <div><span className="text-gray-500">Payment:</span> <span className={displayPaymentStatus.toLowerCase() === "completed" ? "text-green-400" : "text-yellow-400"}>{displayPaymentStatus}</span></div>
                                                    <div>
                                                        <span className="text-gray-500">Status:</span>
                                                        <span className={`ml-2 px-2 py-0.5 rounded text-xs font-semibold ${displayStatus.toLowerCase() === 'approved' ? 'bg-green-500/20 text-green-400' :
                                                                displayStatus.toLowerCase() === 'rejected' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                                                            }`}>
                                                            {displayStatus.toUpperCase()}
                                                        </span>
                                                    </div>
                                                    {member.is_lead_member && (
                                                        <div className="mt-2 text-saffron font-bold text-xs">LEAD MEMBER</div>
                                                    )}
                                                </div>

                                                <div className="mt-auto border-t border-zinc-800 pt-4 flex flex-wrap gap-2">
                                                    {displayStatus.toLowerCase() !== 'approved' && (
                                                        <button onClick={() => handleUpdateMemberStatus(member.id, 'approved')} className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/30 hover:bg-green-500 hover:text-white rounded text-xs transition">Approve</button>
                                                    )}
                                                    {displayStatus.toLowerCase() !== 'rejected' && (
                                                        <button onClick={() => handleUpdateMemberStatus(member.id, 'rejected')} className="px-3 py-1 bg-zinc-800 text-gray-300 hover:bg-zinc-700 rounded text-xs transition">Reject</button>
                                                    )}
                                                    <button onClick={() => handleToggleLeadMember(member.id, !member.is_lead_member)} className="px-3 py-1 bg-zinc-800 text-saffron hover:bg-zinc-700 rounded text-xs transition">
                                                        {member.is_lead_member ? 'Remove Lead' : 'Make Lead'}
                                                    </button>
                                                    <button onClick={() => handleDeleteMember(member)} className="px-3 py-1 bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white rounded text-xs transition ml-auto">Delete</button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                {members.length === 0 && <div className="col-span-full text-center py-8 text-gray-500">No members found.</div>}
                            </div>
                        )}
                    </div>
                )}

                {activeModule === "Donation Records" && (
                    <div className="space-y-6">
                        {donationsError && (
                            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
                                {donationsError}
                            </div>
                        )}

                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-6">
                            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-lg flex flex-col justify-center items-center text-center">
                                <p className="text-gray-400 font-body text-sm uppercase tracking-wider mb-2">Total Donations Amount</p>
                                <h3 className="text-4xl font-bold text-saffron font-spiritual">
                                    ₹{donations.filter(d => (d.payment_status || d.status || "").toLowerCase() === "completed").reduce((sum, d) => sum + (Number(d.amount) || 0), 0).toLocaleString()}
                                </h3>
                            </div>
                            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-lg flex flex-col justify-center items-center text-center">
                                <p className="text-gray-400 font-body text-sm uppercase tracking-wider mb-2">Total Completed Donations</p>
                                <h3 className="text-4xl font-bold text-white font-spiritual">
                                    {donations.filter(d => (d.payment_status || d.status || "").toLowerCase() === "completed").length}
                                </h3>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                            <input
                                type="text"
                                placeholder="Search by name, email, phone, payment ID..."
                                value={donationsSearch}
                                onChange={(e) => setDonationsSearch(e.target.value)}
                                className="w-full sm:max-w-md px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-orange-500 text-white"
                            />
                        </div>

                        {donationsLoading ? (
                            <div className="text-center py-12 text-gray-500">Loading donations...</div>
                        ) : (
                            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl shadow-lg overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-300">
                                    <thead className="bg-zinc-900 text-gray-400 font-body">
                                        <tr>
                                            <th className="px-6 py-4 font-medium">Donor Info</th>
                                            <th className="px-6 py-4 font-medium">Amount</th>
                                            <th className="px-6 py-4 font-medium">Status</th>
                                            <th className="px-6 py-4 font-medium">Payment ID</th>
                                            <th className="px-6 py-4 font-medium">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-800">
                                        {donations
                                            .filter(d => {
                                                const nameStr = (d.first_name ? `${d.first_name} ${d.last_name}` : d.donor_name || d.full_name || "").toLowerCase();
                                                const emailStr = (d.email || "").toLowerCase();
                                                const phoneStr = (d.phone_number || d.phone || "").toLowerCase();
                                                const payIdStr = (d.razorpay_payment_id || d.payment_id || "").toLowerCase();
                                                const q = donationsSearch.toLowerCase();
                                                return nameStr.includes(q) || emailStr.includes(q) || phoneStr.includes(q) || payIdStr.includes(q);
                                            })
                                            .map((donation) => {
                                                const displayName = donation.first_name ? `${donation.first_name} ${donation.last_name}` : donation.donor_name || donation.full_name || "Unknown Donor";
                                                const displayPhone = donation.phone_number || donation.phone || "N/A";
                                                const displayPaymentStatus = donation.payment_status || donation.status || "Unknown";
                                                const displayPayId = donation.razorpay_payment_id || donation.payment_id || "-";
                                                const displayOrderId = donation.razorpay_order_id || donation.order_id || "-";

                                                return (
                                                    <tr key={donation.id} className="hover:bg-zinc-900/50 transition-colors">
                                                        <td className="px-6 py-4">
                                                            <div className="font-bold text-white mb-1">{displayName}</div>
                                                            <div className="text-xs text-gray-500">{donation.email || 'N/A'}</div>
                                                            <div className="text-xs text-gray-500">{displayPhone}</div>
                                                        </td>
                                                        <td className="px-6 py-4 font-bold text-saffron">₹{(Number(donation.amount) || 0).toLocaleString()}</td>
                                                        <td className="px-6 py-4">
                                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${displayPaymentStatus.toLowerCase() === 'completed' ? 'bg-green-500/20 text-green-400' :
                                                                    displayPaymentStatus.toLowerCase() === 'failed' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                                                                }`}>
                                                                {displayPaymentStatus.toUpperCase()}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="text-xs text-gray-400 break-all">{displayPayId}</div>
                                                            <div className="text-xs text-gray-600 break-all mt-1">{displayOrderId}</div>
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-400 text-xs">
                                                            {new Date(donation.created_at).toLocaleDateString()} <br />
                                                            {new Date(donation.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        {donations.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No donation records found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {activeModule && activeModule !== "Gallery Management" && activeModule !== "Live Event Control" && activeModule !== "Members Management" && activeModule !== "Donation Records" && (
                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-12 shadow-lg text-center">
                        <p className="text-gray-400">The {activeModule} module is currently under development.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
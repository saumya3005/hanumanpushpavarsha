"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const adminCards = [
    "Gallery Management",
    "Events Management",
    "Members Management",
    "Donation Records",
    "Live Event Control",
];

export default function AdminPage() {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");
    const [authLoading, setAuthLoading] = useState(false);
    
    const [activeModule, setActiveModule] = useState<string | null>(null);

    // Gallery specific state
    const [albums, setAlbums] = useState<any[]>([]);
    const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
    const [photos, setPhotos] = useState<any[]>([]);
    const [albumTitle, setAlbumTitle] = useState("");
    const [albumYear, setAlbumYear] = useState("");
    const [uploading, setUploading] = useState(false);
    const [galleryError, setGalleryError] = useState("");
    const [gallerySuccess, setGallerySuccess] = useState("");

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
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-zinc-800 pb-8">
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-3">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-400">
                            {activeModule ? `${activeModule}` : "Manage website content, members, donations, gallery, and live events."}
                        </p>
                    </div>
                    <div className="flex gap-4">
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
                                            <button
                                                key={album.id}
                                                onClick={() => {
                                                    setSelectedAlbum(album);
                                                    fetchPhotos(album.id);
                                                }}
                                                className={`w-full text-left px-4 py-3 rounded-lg border transition ${selectedAlbum?.id === album.id ? "bg-orange-500/20 border-orange-500 text-orange-400" : "bg-black border-zinc-800 text-gray-400 hover:border-gray-500"}`}
                                            >
                                                <div className="font-semibold">{album.title}</div>
                                                <div className="text-xs opacity-75">{album.year}</div>
                                            </button>
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
                
                {activeModule && activeModule !== "Gallery Management" && (
                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-12 shadow-lg text-center">
                        <p className="text-gray-400">The {activeModule} module is currently under development.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

type ProfileData = {
    name: string;
    email: string;
    phone: string;
    avatar?: string; // data URL
};

const PROFILE_STORAGE_KEY = 'reeni_user_profile';

const defaultProfile: ProfileData = {
    name: 'আপনার নাম',
    email: 'you@example.com',
    phone: '',
    avatar: undefined
};

// Load profile from localStorage
const loadStoredProfile = (): Partial<ProfileData> => {
    try {
        const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
        if (stored) return JSON.parse(stored);
    } catch {}
    return {};
};

const Profile: React.FC = () => {
    const { user, signOutUser, loading } = useAuth();
    const [profile, setProfile] = useState<ProfileData>(defaultProfile);
    const [editing, setEditing] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (!user || editing) return;

        // Merge Firebase user data with localStorage data (localStorage takes priority for name/phone)
        const stored = loadStoredProfile();
        setProfile({
            name: stored.name || user.displayName || defaultProfile.name,
            email: user.email || stored.email || defaultProfile.email,
            phone: stored.phone || user.phoneNumber || defaultProfile.phone,
            avatar: user.photoURL || stored.avatar || undefined,
        });
    }, [user, editing]);

    useEffect(() => {
        setAvatarPreview(profile.avatar);
    }, [profile.avatar]);

    const handleChange = (field: keyof ProfileData, value: string) => {
        setProfile((p) => ({ ...p, [field]: value }));
    };

    // const handleAvatar = (file?: File) => {
    //     if (!file) return;
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //         const res = reader.result as string;
    //         setProfile((p) => ({ ...p, avatar: res }));
    //     };
    //     reader.readAsDataURL(file);
    // };

    const handleSave = () => {
        // Save to localStorage
        try {
            localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
        } catch {}
        setEditing(false);
    };

    const handleCancel = () => {
        // Reset to saved data
        const stored = loadStoredProfile();
        if (user) {
            setProfile({
                name: stored.name || user.displayName || defaultProfile.name,
                email: user.email || stored.email || defaultProfile.email,
                phone: stored.phone || user.phoneNumber || defaultProfile.phone,
                avatar: user.photoURL || stored.avatar || undefined,
            });
        }
        setEditing(false);
    };

    const handleSignOut = async () => {
        await signOutUser();
    };

    return (
        <div className="max-w-4xl mx-auto mt-3 sm:mt-6 p-6 sm:bg-white rounded-lg sm:border sm:border-gray-200">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-lg font-semibold">প্রোফাইল</h2>
                    <p className="text-sm text-gray-500">আপনার যোগাযোগের তথ্য</p>
                </div>

                {/* Desktop actions: show on md+ */}
                <div className="hidden md:flex items-center gap-2">
                    {!editing ? (
                        <button
                            onClick={() => setEditing(true)}
                            className="px-3 py-1.5 bg-[#427baa] text-white rounded text-sm"
                        >
                            এডিট
                        </button>
                    ) : (
                        <>
                            <button onClick={handleSave} className="px-3 py-1.5 bg-[#1f7fb3] text-white rounded text-sm">
                                সংরক্ষণ
                            </button>
                            <button onClick={handleCancel} className="px-3 py-1.5 border rounded text-sm">
                                বাতিল
                            </button>
                        </>
                    )}
                    {!loading && user ? (
                        <button
                            onClick={handleSignOut}
                            className="px-3 py-1.5 border border-red-200 text-red-600 rounded text-sm hover:bg-red-50"
                        >
                            Sign out
                        </button>
                    ) : null}
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 flex flex-col items-center md:items-start">
                    <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                        {avatarPreview ? (
                            // eslint-disable-next-line jsx-a11y/img-redundant-alt
                            <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-xl text-gray-600">{(profile.name || 'আপনি').slice(0, 1)}</span>
                        )}
                    </div>



                    
                </div>

                <div className="col-span-2">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-xs text-gray-600">নাম</label>
                            {!editing ? (
                                <div className="mt-1 text-gray-900">{profile.name}</div>
                            ) : (
                                <input
                                    value={profile.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#427baa]"
                                />
                            )}
                        </div>

                        <div>
                            <label className="block text-xs text-gray-600">ইমেইল</label>
                            {!editing ? (
                                <div className="mt-1 text-gray-900">{profile.email}</div>
                            ) : (
                                <input
                                    value={profile.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#427baa]"
                                />
                            )}
                        </div>

                        <div>
                            <label className="block text-xs text-gray-600">ফোন</label>
                            {!editing ? (
                                <div className="mt-1 text-gray-900">{profile.phone || '-'}</div>
                            ) : (
                                <input
                                    value={profile.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#427baa]"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile actions: show below content on small screens */}
            <div className="mt-4 md:hidden flex flex-col gap-3">
                {!editing ? (
                    <button
                        onClick={() => setEditing(true)}
                        className="w-full px-3 py-2 bg-[#427baa] text-white rounded text-sm"
                    >
                        এডিট
                    </button>
                ) : (
                    <div className="flex gap-3">
                        <button onClick={handleSave} className="flex-1 px-3 py-2 bg-[#1f7fb3] text-white rounded text-sm">
                            সংরক্ষণ
                        </button>
                        <button onClick={handleCancel} className="flex-1 px-3 py-2 border rounded text-sm">
                            বাতিল
                        </button>
                    </div>
                )}
                {!loading && user ? (
                    <button
                        onClick={handleSignOut}
                        className="w-full px-3 py-2 border border-red-200 text-red-600 rounded text-sm hover:bg-red-50"
                    >
                        Sign out
                    </button>
                ) : null}
            </div>
        </div>
    );
};

export default Profile;
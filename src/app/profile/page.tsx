import ProfileOverview from '@/features/profile/components/profile-overview';
import { getSession } from '@/lib/getSession';
import { loginPath } from '@/path';
import { redirect } from 'next/navigation';
import React from 'react'

const ProfilePage = async() => {
    const session = await getSession();

    if(!session) {
        redirect(loginPath)
    }

  return <ProfileOverview user={session.user} />
}

export default ProfilePage
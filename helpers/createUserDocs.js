import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/firebaseConfig'; 

async function createUserFirestoreDocs(userId) {
  if (!userId) throw new Error('A valid user ID is required');

  const goalsPath = `goals/${userId}`;
  const profilePath = `profile/${userId}`;
  const trackPerformancePath = `track_performance/${userId}`;

  const badges = [
  {
    badge_link: "https://cdn2.iconfinder.com/data/icons/gamification-badges-1/300/streak_7d1-1024.png",
    badge_name: "7 days",
    has_badge: false
  },
  {
    badge_link: "https://img.freepik.com/premium-vector/1-month-money-back-guarantee-gold-badges_669907-29.jpg",
    badge_name: "1 month",
    has_badge:false 
  },
  {
    badge_link: "https://audaxmedals.southportcc.co.uk/wp-content/uploads/2017/01/Badge16-BP100.jpg",
    badge_name: "100 km",
    has_badge: false
  }
];

  const defaultGoalsData = {
    badges: badges,
    daily_km: '',
    streak: '',
    user_id: userId,
    weekly_km: '',
  };

  const defaultProfileData = {
    badges: badges,
    metrics: {
      average_pace: 7,
      fastest_pace: 10,
      longest_route: "18",
      total_steps: 18000,
      user_id: userId,
      user_image: "user_image",
      username: "username",
    },
  };

  const defaultTrackPerformanceData = {
    _id: '', 
    trackId: '', 
    creatorId: userId,
    start: 0,
    end: 0,
    distance: 0,
    speed_ms: 0,
    stepsTaken: 0,
    path: [],
  };

  try {
    await setDoc(doc(db, goalsPath), defaultGoalsData);
    await setDoc(doc(db, profilePath), defaultProfileData);
    await setDoc(doc(db, trackPerformancePath), defaultTrackPerformanceData);

    console.log('User documents created successfully');
  } catch (error) {
    console.error('Error creating user documents:', error);
    throw error;
  }
}

export default createUserFirestoreDocs;
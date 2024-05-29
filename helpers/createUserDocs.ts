import { setDoc, doc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Goals } from "@/interfaces/goals";
import { TrackPerformance } from "@/interfaces/track";
import { Profile } from "@/interfaces/profile";
import { Badge } from "@/interfaces/badge";

export default async function createUserFirestoreDocs(userId: string) {
  if (!userId) throw new Error("A valid user ID is required");

  const goalsRef = doc(db, "goals", userId);
  const profileRef = doc(db, "profile", userId);
  const trackPerformanceRef = doc(db, "track_performance", userId);

  const badges: Badge[] = [
    {
      badge_link:
        "https://cdn2.iconfinder.com/data/icons/gamification-badges-1/300/streak_7d1-1024.png",
      badge_name: "7 days",
      has_badge: false,
      current_progress: 0,
      overall_progress: 100,
      description: "Complete 7 days of running streak",
    },
    {
      badge_link:
        "https://img.freepik.com/premium-vector/1-month-money-back-guarantee-gold-badges_669907-29.jpg",
      badge_name: "1 month",
      has_badge: false,
      current_progress: 0,
      overall_progress: 100,
      description: "Complete 1 month of running streak",
    },
    {
      badge_link:
        "https://audaxmedals.southportcc.co.uk/wp-content/uploads/2017/01/Badge16-BP100.jpg",
      badge_name: "100 km",
      has_badge: false,
      current_progress: 0,
      overall_progress: 100,
      description: "Complete 100 km of running",
    },
  ];

  const defaultGoalsData: Goals = {
    badges: badges,
    daily_km: "7",
    streak: "3",
    user_id: userId,
    weekly_km: "49",
  };

  const defaultProfileData: Profile = {
    badges: badges,
    metrics: {
      average_pace: 7,
      fastest_pace: 10,
      longest_route: "18",
      total_steps: 18000,
      user_id: userId,
      user_image:
        "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png",
      username: "Username",
    },
  };

  const defaultTrackPerformanceData: TrackPerformance = {
    _id: "",
    trackId: "",
    creatorId: userId,
    start: 0,
    end: 0,
    distance: 0,
    speed_ms: 0,
    stepsTaken: 0,
    path: [],
  };

  try {
    console.log("Creating user documents...");
    await setDoc(goalsRef, defaultGoalsData);
    await setDoc(profileRef, defaultProfileData);
    await setDoc(trackPerformanceRef, defaultTrackPerformanceData);

    console.log("User documents created successfully");
  } catch (error) {
    console.error("Error creating user documents:", error);
    throw error;
  }
}

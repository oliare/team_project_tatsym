export interface Material {
    id: number;
    title: string;
    description: string;
    date: string;
    theme?: string;
    imageUrl?: string;
  }


export interface RatingData {
    groupRating: number;
    streamRating: number;
    individualWork: {
      completed: number;
      inProgress: number;
      overdue: number;
    };
    averageScore: number;
    individualScore: number;
    classWorkScore: number;
  }


export interface LeaderboardEntry {
    name: string;
    points: number;
    imageUrl: string;
  } 

  export interface UserProfileProps {
    user: {
      name: string;
      surname: string;
      phone: string;
      email: string;
      avatarUrl?: string;
    };
  }
  

export interface Assignment {
  title: string;
  dateVisible: string;
  deadline: string;
  image: string;
  }
  
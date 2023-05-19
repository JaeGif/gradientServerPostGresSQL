export type User = {
  username: String;
  age: number;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'elite';
  email: string;
  preferences: JSON;
};

export type Muscle = {
  name: string;
};

export type MuscleGroup = {
  name: string;
};

export type Exercise = {
  name: string;
  reps: number;
  sets: number;
  rtf?: number;
};

export type Workout = {
  name: string;
};

// Auth service types

export interface GithubProfile {
  id: string;
  nodeId?: string;
  displayName?: string;
  username: string;
  profileUrl?: string;
  photos?: string[];
  provider: string;
  _raw: string;
  _json: {
    login: string;
    id: number;
    node_id?: string;
    avatar_url?: string;
    gravatar_id?: string;
    url?: string;
    html_url?: string;
    following_url?: string;
    gists_url?: string;
    starred_url?: string;
    subscriptions_url?: string;
    organizations_url?: string;
    repos_url?: string;
    events_url?: string;
    received_events_url?: string;
    type?: string;
    site_admin?: boolean;
    name?: string;
    company?: string;
    blog?: string;
    location?: string;
    email?: string;
    hireable?: boolean;
    bio?: string;
    twitter_username?: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
  };
}

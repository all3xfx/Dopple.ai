interface DoppleItem {
  _id: string;
  name: string;
  category: number;
  subcategory: number;
  sender: string;
  tagLine: string;
  bio: string;
  email: string;
  avatarURL: string;
  bannerURL: string;
  visibility: number;
  deactive: boolean;
  shareName: string;
  createdAt: string;
  updatedAt: string;
  avatarURLSM: string;
  bannerVideoURL: string;
  chattingNow: number;
  messageCount: number;
  username?: string;
}

type DoppleList = DoppleItem[];

type DoppleResponse = { success: true; data: DoppleList } | { success: false };

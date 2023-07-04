import { IOContext, SegmentData } from "@vtex/api";

interface CurrentProfile {
  email: string;
  userId: string;
}

export interface CustomIOContext extends IOContext {
  currentProfile: CurrentProfile;
  segment?: SegmentData;
  orderFormId?: string;
  ownerId?: string;
}

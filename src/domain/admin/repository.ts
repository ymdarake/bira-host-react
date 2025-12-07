import { getApp } from "firebase/app";
import {
  collection,
  Firestore,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
} from "firebase/firestore";

const COLLECTION_PATH = "admin";

export function NewAdminRepository(): AdminRepository {
  const app = getApp();
  const firestore = getFirestore(app);
  return new AdminRepository(firestore);
}

// NOTE: 実装(infraレイヤー)もここに書く(インターフェースと実装を分けて書くのはもう少し複雑になってきてからにする)
// NOTE: 現状そこまで複雑な操作セットが発生していないので、 serviceレイヤーも設けていない。
class AdminRepository {
  private delegate: Firestore;

  constructor(delegate: Firestore) {
    this.delegate = delegate;
  }

  // 特定のUIDを持つ管理者が存在するかチェック
  async exists(userUid: string): Promise<boolean> {
    const q = query(
      collection(this.delegate, COLLECTION_PATH),
      where("userUid", "==", userUid),
      limit(1) // 1件あれば十分
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }
}

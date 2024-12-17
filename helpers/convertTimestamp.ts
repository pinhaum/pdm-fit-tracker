import { Timestamp } from "firebase/firestore";

export default function convertTimestamp(timestamp: Timestamp) {
  return timestamp.toDate().toLocaleString();
}

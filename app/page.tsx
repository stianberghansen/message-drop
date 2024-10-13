import styles from "./page.module.css";
import Encrypter from "./Encrypter";
import { headers } from "next/headers";
import { IV_SIZE } from "./utils";
import { getRandomValues } from "node:crypto";

export default function Home() {
  const headerList = headers();
  const iv = getRandomValues(new Uint8Array(IV_SIZE));

  return (
    <div className={styles.page}>
      {
        headerList && iv &&
        <Encrypter iv={iv} hostname={headerList.get('host') ?? ""} />
      }
    </div>
  );
}

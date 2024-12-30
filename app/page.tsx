import styles from "./page.module.css";
import Encrypter from "./Encrypter";
import { headers } from "next/headers";
import { getRandomValues } from "crypto";
import { IV_SIZE, uint8ToBase64 } from "./utils";

export default function Home({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const headerList = headers();
  console.log(searchParams?['crypt']);


  const iv = getRandomValues(new Uint8Array(IV_SIZE));

  // const test = uint8ToBase64()

  return (
    <div className={styles.page}>
      {
        headerList &&
        <Encrypter iv={iv} hostname={headerList.get('host') ?? ""} />
      }
    </div>
  );
}

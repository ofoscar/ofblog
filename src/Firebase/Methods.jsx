import { collection, getDocs } from 'firebase/firestore';
import db from '../firebase';

export async function getData(reference) {
  const data = [];
  const collRef = collection(db, reference);
  const snapshot = await getDocs(collRef);
  snapshot.forEach((doc) => {
    const fecha = doc.data().date.toDate();
    const dia = fecha.getUTCDate();
    const mes = fecha.getUTCMonth() + 1;
    const ano = fecha.getUTCFullYear();
    const fechaFormatted = `${dia}/${mes}/${ano}`;

    data.push({ ...doc.data(), dateFormatted: fechaFormatted });
  });
  return data;
}

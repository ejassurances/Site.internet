import { redirect } from "next/navigation";

/* Ancienne URL conservee pour compatibilite : le simulateur vit sur la page assurance emprunteur. */
export default function SimulateurPage() {
  redirect("/assurance-emprunteur#simulateur");
}

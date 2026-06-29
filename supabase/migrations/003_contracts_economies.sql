-- Ajout du champ économies réalisées sur les contrats emprunteur
alter table contracts
  add column if not exists economies_realisees integer default null;

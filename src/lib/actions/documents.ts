'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export interface DocumentFormData {
  nom: string;
  description?: string;
  compagnie_id?: string;
  typologie_id?: string;
  sous_type?: string;
  version?: string;
  tags?: string[];
  statut?: 'actif' | 'archive' | 'brouillon';
  date_validite?: string;
}

// ─── Récupérer tous les documents ─────────────────────────────────────────

export async function getDocuments(filters?: {
  compagnie_id?: string;
  typologie_id?: string;
  statut?: string;
  search?: string;
}) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { data: [], error: 'Non authentifié' };

  let query = supabase
    .from('documents_cabinet')
    .select(`
      *,
      compagnie:compagnies_assurance(id, slug, nom, logo_emoji, couleur_hex),
      typologie:typologies_documentaires(id, slug, label, icon)
    `)
    .order('created_at', { ascending: false });

  if (filters?.compagnie_id) query = query.eq('compagnie_id', filters.compagnie_id);
  if (filters?.typologie_id) query = query.eq('typologie_id', filters.typologie_id);
  if (filters?.statut) query = query.eq('statut', filters.statut);
  if (filters?.search) {
    query = query.or(`nom.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }

  const { data, error } = await query;
  return { data: data || [], error: error?.message };
}

// ─── Créer un document ────────────────────────────────────────────────────

export async function createDocument(formData: DocumentFormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: 'Non authentifié' };

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Non authentifié' };

  const { data, error } = await supabase
    .from('documents_cabinet')
    .insert({
      ...formData,
      cree_par: user.id,
    })
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath('/admin/vente/ged');
  return { data };
}

// ─── Mettre à jour un document ────────────────────────────────────────────

export async function updateDocument(id: string, formData: Partial<DocumentFormData>) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: 'Non authentifié' };

  const { data, error } = await supabase
    .from('documents_cabinet')
    .update(formData)
    .eq('id', id)
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath('/admin/vente/ged');
  return { data };
}

// ─── Supprimer un document ────────────────────────────────────────────────

export async function deleteDocument(id: string) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: 'Non authentifié' };

  const { error } = await supabase
    .from('documents_cabinet')
    .delete()
    .eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/admin/vente/ged');
  return { success: true };
}

// ─── Récupérer les compagnies ─────────────────────────────────────────────

export async function getCompagnies() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { data: [], error: 'Non authentifié' };

  const { data, error } = await supabase
    .from('compagnies_assurance')
    .select('*')
    .eq('actif', true)
    .order('nom');

  return { data: data || [], error: error?.message };
}

// ─── Récupérer les typologies ─────────────────────────────────────────────

export async function getTypologies() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { data: [], error: 'Non authentifié' };

  const { data, error } = await supabase
    .from('typologies_documentaires')
    .select('*')
    .eq('actif', true)
    .order('ordre');

  return { data: data || [], error: error?.message };
}

// ─── Sauvegarder un journal d'anonymisation ───────────────────────────────

export async function saveJournalAnonymisation(journal: {
  document_id?: string;
  nom_fichier_original?: string;
  type_fichier?: string;
  taille_octets?: number;
  mode_anonymisation?: 'ia' | 'regex';
  total_detections?: number;
  score_rgpd?: number;
  categories_detectees?: Record<string, number>;
  texte_anonymise?: string;
  statut?: 'en_cours' | 'termine' | 'erreur';
  erreur_message?: string;
}) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: 'Non authentifié' };

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Non authentifié' };

  const { data, error } = await supabase
    .from('journaux_anonymisation')
    .insert({
      ...journal,
      utilisateur_id: user.id,
    })
    .select()
    .single();

  if (error) return { error: error.message };
  return { data };
}

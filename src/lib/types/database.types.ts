export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      exercises: {
        Row: {
          created_at: string
          has_duration: boolean
          has_reps: boolean
          has_weight: boolean
          id: number
          last_set: string | null
          name: string
          user_id: string
          weight_unit: Database["public"]["Enums"]["weight_unit"]
        }
        Insert: {
          created_at?: string
          has_duration?: boolean
          has_reps?: boolean
          has_weight?: boolean
          id?: number
          last_set?: string | null
          name: string
          user_id: string
          weight_unit?: Database["public"]["Enums"]["weight_unit"]
        }
        Update: {
          created_at?: string
          has_duration?: boolean
          has_reps?: boolean
          has_weight?: boolean
          id?: number
          last_set?: string | null
          name?: string
          user_id?: string
          weight_unit?: Database["public"]["Enums"]["weight_unit"]
        }
        Relationships: [
          {
            foreignKeyName: "exercises_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      sets: {
        Row: {
          completed_at: string
          created_at: string
          date: string
          duration_secs: number
          exercise_id: number
          id: number
          reps: number | null
          user_id: string
          weight: number | null
          weight_unit: Database["public"]["Enums"]["weight_unit"]
        }
        Insert: {
          completed_at?: string
          created_at?: string
          date?: string
          duration_secs?: number
          exercise_id: number
          id?: number
          reps?: number | null
          user_id: string
          weight?: number | null
          weight_unit: Database["public"]["Enums"]["weight_unit"]
        }
        Update: {
          completed_at?: string
          created_at?: string
          date?: string
          duration_secs?: number
          exercise_id?: number
          id?: number
          reps?: number | null
          user_id?: string
          weight?: number | null
          weight_unit?: Database["public"]["Enums"]["weight_unit"]
        }
        Relationships: [
          {
            foreignKeyName: "sets_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_exercise_summary_per_day: {
        Args: {
          p_user_id: string
          p_exercise_id: number
        }
        Returns: {
          date: string
          max_weight: number
          total_reps: number
          total_duration_secs: number
          num_sets: number
        }[]
      }
    }
    Enums: {
      weight_unit: "kg" | "lb"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

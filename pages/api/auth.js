/* pages/api/auth.js */
import {
  supabase
} from '../../utils/supabaseClient'

export default function handler(req, res) {
  supabase.auth.api.setAuthCookie(req, res)
}

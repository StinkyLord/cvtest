import axios from 'axios'
import { Note } from '@/types/note'

export class NoteService {
  getNote(): Promise<Note> {
    return axios.get('data/note.json').then((res) => res.data)
  }
}

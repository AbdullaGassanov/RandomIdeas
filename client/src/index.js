
import './scss/style.scss';
import { Modal } from './components/Modal.js';
import { IdeaForm } from './components/IdeaForm.js';
import { IdeaList } from './components/IdeaList.js';

const modal = new Modal();
const ideaForm = new IdeaForm();
const ideaList = new IdeaList();
ideaForm.render();
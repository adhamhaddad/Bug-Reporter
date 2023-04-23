import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const IMAGE_UPLOADS = 'uploads/images';
const PROFILES_UPLOADS = 'uploads/profiles';

const images_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMAGE_UPLOADS);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLocaleLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  }
});
const profiles_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PROFILES_UPLOADS);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLocaleLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  }
});
export const uploadImages = multer({ storage: images_storage });
export const uploadProfiles = multer({ storage: profiles_storage });

import { FormFaceModal } from "./formface";
import { GendersModal } from "./genders";
import { GlassesMaterialModal } from "./glassesMaterial";
import { GlassesShapeModal } from "./glassesShape";

export interface ProductFilterModel {
  gender?: GendersModal;
  formface?: FormFaceModal[];
  glassesMaterial?: GlassesMaterialModal[];
  glassesShape?: GlassesShapeModal[];
}

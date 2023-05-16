import axios from "axios";
import qs from "qs";
import { ApiConfig } from "../../common/ApiConfig";
import { FormFaceModal } from "../../models/formface";
import { GendersModal } from "../../models/genders";
import { GlassesMaterialModal } from "../../models/glassesMaterial";
import { GlassesShapeModal } from "../../models/glassesShape";
import { ProductModel } from "../../models/product";

export const fetchGenders = async (): Promise<GendersModal[]> => {
  let data: GendersModal[] = [];
  const fetchURL = ApiConfig.prod_baseUrl + "api/gender/";
  await axios
    .get(fetchURL)
    .then((response) => {
      data = response.data;
    })
    .catch((err) => {
      console.error(err);
    });
  return data;
};

export const fetchFormFace = async (
  genderId?: number
): Promise<FormFaceModal[]> => {
  let data: FormFaceModal[] = [];
  const fetchURL = ApiConfig.prod_baseUrl + "api/form-face/";
  await axios
    .get(fetchURL, { params: { gender: genderId } })
    .then((response) => {
      data = response.data;
    })
    .catch((err) => {
      console.error(err);
    });
  return data;
};

export const fetchGlassesShape = async (): Promise<GlassesShapeModal[]> => {
  let data: GlassesShapeModal[] = [];
  const fetchURL = ApiConfig.prod_baseUrl + "api/glass-shape";
  await axios
    .get(fetchURL)
    .then((response) => {
      data = response.data;
    })
    .catch((err) => {
      console.error(err);
    });
  return data;
};
export const fetchGlassesMaterial = async (): Promise<
  GlassesMaterialModal[]
> => {
  let data: GlassesMaterialModal[] = [];
  const fetchURL = ApiConfig.prod_baseUrl + "api/glass-material";
  await axios
    .get(fetchURL)
    .then((response) => {
      data = response.data;
    })
    .catch((err) => {
      console.error(err);
    });
  return data;
};

export interface ProductFilterCommand {
  genderId?: number;
  formFaceId?: number[];
  glassMaterialId?: number[];
  glassesShapeId?: number[];
}

export const fetchProductFilter = async ({
  genderId,
  formFaceId,
  glassMaterialId,
  glassesShapeId,
}: ProductFilterCommand): Promise<ProductModel[]> => {
  let data: ProductModel[] = [];
  const fetchURL = ApiConfig.prod_baseUrl + "api/product/";
  await axios
    .get(fetchURL, {
      params: {
        gender: genderId,
        form_face: formFaceId,
        glasses_material: glassMaterialId,
        glasses_shape: glassesShapeId,
      },
      paramsSerializer: {
        serialize: (params: any) => {
          return qs.stringify(params, { indices: false });
        },
      },
    })
    .then((response) => {
      data = response.data;
    })
    .catch((err) => {
      console.error(err);
    });
  return data;
};

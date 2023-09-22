from django_filters import rest_framework as filters


class ProductFilter(filters.FilterSet):

    gender = filters.NumberFilter(field_name='gender__id', method='filter_gender')
    form_face = filters.CharFilter(field_name='form_face_id', method='filter_form_face', help_text="List form_face was separated by ',' and no space between. Example: form_face1_id,form_face2_id,form_face3_id")
    glasses_shape = filters.CharFilter(field_name='glasses_shape_id', method='filter_glasses_shape', help_text="List glasses_shape was separated by ',' and no space between. Example: glasses_shape1_id,glasses_shape2_id,glasses_shape3_id")
    glasses_material = filters.CharFilter(field_name='glasses_material__id', method='filter_glasses_material', help_text="List filter_glasses_material was separated by ',' and no space between. Example: filter_glasses_material1_id,filter_glasses_material2_id,filter_glasses_material3_id")
    category = filters.NumberFilter(field_name='category__id')

    def filter_gender(self, queryset, name, value):
        return queryset.filter(gender__id=value)

    def filter_glasses_material(self, queryset, name, value):
        if value:
            value_list = value.split(',')
            return queryset.filter(glasses_material__id__in=value_list)
        return queryset

    def filter_form_face(self, queryset, name, value):
        if value:
            value_list = value.split(',')
            return queryset.filter(form_face__id__in=value_list)
        return queryset

    def filter_glasses_shape(self, queryset, name, value):
        if value:
            value_list = value.split(',')
            return queryset.filter(glasses_shape__id__in=value_list)
        return queryset


class FormFaceFilter(filters.FilterSet):

    gender = filters.NumberFilter(field_name='gender__id', method='filter_gender', help_text="Filter by gender_id")

    def filter_gender(self, queryset, name, value):
        return queryset.filter(gender__id=value)


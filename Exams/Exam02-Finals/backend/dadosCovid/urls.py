from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),

    path('api/save', views.save_api_note),

    path('api/get', views.get_country_data),

    path('api/cf', views.get_curious_fact)
]
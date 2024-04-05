from django.urls import path
from rest_framework import routers
from . import api

router = routers.DefaultRouter()
router.register('api/profesores', api.ProfesoresViewSet, 'Profesores')

urlpatterns = [
    path('api/updateScore/<int:id>/', api.updateScore),
    path('api/subpartida/alumnos/<int:subpartidaID>/', api.getAlumnosSubpartida),
    path('api/subpartida/<int:subpartidaID>/', api.getCartasSubPartida),
    path('api/partida/alumnos/<int:partidaID>/', api.getAlumnosPartida),
    path('api/partida/<int:partidaID>/', api.getCartasPartida),
    path('api/crearPartida/', api.crearPartida),
    path('api/unirse/', api.unirse),
]
urlpatterns += router.urls

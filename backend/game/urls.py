from django.urls import path
from rest_framework import routers
from . import api

router = routers.DefaultRouter()
router.register('api/profesores', api.ProfesoresViewSet, 'Profesores')

urlpatterns = [
    path('api/crear/', api.crearPartida),
    path('api/unirse/', api.unirse),
    path('api/subpartida/alumnos/<int:subpartidaID>/', api.getAlumnosSubpartida),
    path('api/partida/alumnos/<int:partidaID>/', api.getAlumnosPartida),
    path('api/cartas/subpartida/<int:subpartidaID>/', api.getCartasSubPartida),
    path('api/partida/cartas/<int:partidaID>/', api.getCartasPartida),
    path('api/partida/<int:id>/', api.getPartida),
    path('api/update/partida/<int:id>/', api.updatePartida),
    path('api/subpartida/<int:subpartidaID>/', api.voltearCartas),
    path('api/updateScore/<int:id>/', api.updateScore),
]
urlpatterns += router.urls

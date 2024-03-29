from django.urls import path
from rest_framework import routers
from .api import ProfesoresViewSet, updateScore, getAlumnosSubpartida, getAlumnosPartida, crearPartida, unirse

router = routers.DefaultRouter()
router.register('api/profesores', ProfesoresViewSet, 'Profesores')

urlpatterns = [
    path('api/updateScore/<int:id>/', updateScore),
    path('api/subpartida/alumnos/<int:subpartidaID>/', getAlumnosSubpartida),
    path('api/partida/alumnos/<int:partidaID>/', getAlumnosPartida),
    path('api/crearPartida/', crearPartida),
    path('api/unirse/', unirse),
]
urlpatterns += router.urls

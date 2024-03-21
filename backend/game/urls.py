from django.urls import path
from rest_framework import routers
from .api import ProfesoresViewSet, updateScore, getAlumnosSubpartida, crearPartida

router = routers.DefaultRouter()
router.register('api/profesores', ProfesoresViewSet, 'Profesores')

urlpatterns = [
    path('api/updateScore/<int:id>/', updateScore),
    path('api/subpartida/alumnos/<int:id>/', getAlumnosSubpartida),
    path('api/crearPartida/', crearPartida),
]
urlpatterns += router.urls

from django.urls import path
from rest_framework import routers
from .api import ProfesoresViewSet, AlumnosViewSet, PartidasViewSet, SubpartidasViewSet, CartasViewSet, updateScore

router = routers.DefaultRouter()
router.register('api/profesores', ProfesoresViewSet, 'Profesores')
router.register('api/alumnos', AlumnosViewSet, 'Alumnos')
router.register('api/partidas', PartidasViewSet, 'Partidas')
router.register('api/subpartidas', SubpartidasViewSet, 'Subpartidas')
router.register('api/cartas', CartasViewSet, 'Cartas')

urlpatterns = [
    path('api/updateScore/<int:pk>/', updateScore)
]
urlpatterns += router.urls

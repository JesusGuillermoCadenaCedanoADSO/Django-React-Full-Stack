from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.http import JsonResponse
import os

def api_root(request):
    return JsonResponse({"message": "Backend funcionando correctamente"})

urlpatterns = [
    path("", api_root),  # Evita redirigir a localhost en producción

    path("admin/", admin.site.urls),

    # Rutas de autenticación
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),

    # Navegación del API
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls")),
]

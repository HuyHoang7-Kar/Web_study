from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# Import view cập nhật tài khoản từ module student_setting_account
from api.views.student.student_setting_account.student_setting_account import student_setting_account_view

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Các URL auth
    path('api/', include('api.urls.auth.login')),
    path('api/', include('api.urls.auth.forgotpassword')),
    path('api/', include('api.urls.auth.register')),
    path('api/', include('api.urls.auth.resetpassword')),
    path('api/', include('api.urls.auth.verify_otp')),
    
    # Các URL user
    path('api/', include('api.urls.user.admin')),
    path('api/', include('api.urls.user.normal_users')),
    path('api/', include('api.urls.user.student')),
    path('api/', include('api.urls.user.teacher')),
    
    # Thêm endpoint cập nhật thông tin tài khoản của sinh viên
    path('api/student/student_setting_account/update/', student_setting_account_view, name='student_setting_account_update'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

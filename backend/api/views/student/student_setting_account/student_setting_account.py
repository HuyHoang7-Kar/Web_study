from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import make_password
from django.core.files.storage import default_storage
from django.conf import settings
import os
from datetime import datetime

# Giả sử model User đã được mở rộng và chứa các trường cần cập nhật
from api.models import User  

@csrf_exempt
def student_setting_account_view(request):
    if request.method != "POST":
        return JsonResponse({"error": "Phương thức không được phép."}, status=405)
    
    # Lấy dữ liệu từ POST
    full_name = request.POST.get("full_name")
    email = request.POST.get("email")
    phone = request.POST.get("phone")
    username = request.POST.get("username")
    birth_date_str = request.POST.get("birth_date", "")
    gender = request.POST.get("gender")
    address = request.POST.get("address")
    newPassword = request.POST.get("newPassword")
    confirmNewPassword = request.POST.get("confirmNewPassword")
    
    # Kiểm tra mật khẩu mới nếu có
    if newPassword and newPassword != confirmNewPassword:
        return JsonResponse({"error": "Mật khẩu mới không khớp!"}, status=400)
    
    # Lấy đối tượng user theo username
    user = get_object_or_404(User, username=username)

    # Xử lý ngày sinh: kiểm tra định dạng YYYY-MM-DD (nếu không gửi, có thể để trống)
    if birth_date_str:
        try:
            # Nếu birth_date_str không đúng định dạng, sẽ ném ValueError
            birth_date_value = datetime.strptime(birth_date_str, "%Y-%m-%d").date()
            user.birth_date = birth_date_value
        except ValueError:
            return JsonResponse({"error": "Định dạng ngày sinh không hợp lệ. Vui lòng dùng YYYY-MM-DD."}, status=400)
    else:
        # Nếu không có birth_date_str, có thể đặt None hoặc giữ nguyên dữ liệu cũ
        user.birth_date = None  # Hoặc user.birth_date = user.birth_date (nếu muốn giữ nguyên)
    
    # Cập nhật dữ liệu text
    user.full_name = full_name
    user.email = email
    user.phone = phone
    user.gender = gender
    user.address = address
    
    # Xử lý file upload (avatar) nếu có
    if 'avatar' in request.FILES:
        avatar = request.FILES['avatar']
        # Kiểm tra định dạng file nếu cần (chỉ cho phép .jpg, .png, …)
        # Ví dụ:
        allowed_types = ['image/jpeg', 'image/png']
        if avatar.content_type not in allowed_types:
            return JsonResponse({"error": "Chỉ chấp nhận file .jpg hoặc .png."}, status=400)
        
        filename = default_storage.save(avatar.name, avatar)
        user.avatar = filename

    # Cập nhật mật khẩu nếu có
    if newPassword:
        user.password = make_password(newPassword)
    
    # Lưu lại thay đổi vào MySQL
    user.save()
    
    return JsonResponse({"message": "Cập nhật thành công!"})

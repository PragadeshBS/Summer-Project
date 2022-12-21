from django.http import HttpResponse

def my_endpoint(request):
    return HttpResponse('Success')
from django.shortcuts import render, redirect
from .models import Note

def index(request):
    if request.method == 'POST':
        id = request.POST.get('id')
        title = request.POST.get('titulo')
        content = request.POST.get('detalhes')
        title_edit = request.POST.get('titulo-edit')
        content_edit = request.POST.get('detalhes-edit')

        if not id:
            new_note = Note(title=title, content=content)
            new_note.save()
        elif id and title_edit and content_edit:
            Note.objects.filter(id = id).update(title=title_edit, content=content_edit)
        elif id and not title_edit:
            Note.objects.filter(id = id).delete()
            
        return redirect('index')
    else:
        all_notes = Note.objects.all()
        return render(request, 'notes/index.html', {'notes': all_notes})

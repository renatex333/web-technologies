from django.shortcuts import render, redirect
from .models import Fact


def index(request):
    if request.method == 'POST':
        content = request.POST.get('detalhes')
        # TAREFA: Utilize o title e content para criar um novo Note no banco de dados
        new_fact = Fact(content=content)
        new_fact.save()
        return redirect('index')
    else:
        all_facts = Fact.objects.all()
        counter = all_facts.count()
        print(all_facts)
        print(counter)
        return render(request, 'facts/index.html', {'facts': all_facts, 'counter': counter})
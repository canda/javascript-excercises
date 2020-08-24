Implementa el método maxActivities(map)de forma que devuelva el tamaño del grupo más grande de actividades cercanas.
 
La matriz map es un array de dos dimensiones que representa las distintas posiciones en una ciudad, y contiene un 0  o un 1  en cada posición. 
Un 1 representa una posición que contiene una actividad. Un 0 es una posición en la cual no hay actividades disponibles.
Una actividad es cercana a otra cuando las mismas están juntas de forma inmediata teniendo en cuanta las direcciones: ARRIBA, ABAJO, IZQUIERDA y DERECHA.
 
Ejemplo
Input:
1,  0,  0,  0,  1
0,  1,  1,  0,  1
0,  1,  1,  0,  1
1,  0,  0,  1,  1
1,  1,  0,  0,  1
 
Output:
6
from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)

# Создание базы данных и таблицы
def init_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS reviews (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            group_type TEXT NOT NULL,
            restaurants TEXT NOT NULL,
            locations TEXT NOT NULL,
            atmosphere TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# Главная страница с формой
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Получаем данные из формы
        group_type = request.form['group']
        restaurants = request.form['restaurants']
        locations = request.form['locations']
        atmosphere = request.form['atmosphere']

        # Сохраняем данные в базу
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO reviews (group_type, restaurants, locations, atmosphere)
            VALUES (?, ?, ?, ?)
        ''', (group_type, restaurants, locations, atmosphere))
        conn.commit()
        conn.close()

        return redirect(url_for('index'))

    return render_template('index.html')

# Запуск приложения
if __name__ == '__main__':
    init_db()
    app.run(debug=True)
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="login-container">
      <ng-container *ngIf="!currentUser; else userAvatar">
        <button class="login-btn" (click)="login()">
          <span class="btn-icon">👤</span>
          Войти
        </button>
      </ng-container>

      <ng-template #userAvatar>
        <div class="user-profile" (click)="goToProfile()">
          <img
            [src]="currentUser?.avatar || 'assets/default-avatar.png'"
            [alt]="currentUser?.nickname || 'Профиль'"
            class="avatar-img"
          >
          <span class="user-name">{{ currentUser?.nickname || 'Профиль' }}</span>
        </div>
      </ng-template>
    </div>

    <section class="hero">
      <div class="hero-content">
        <h1 class="animate-title">Планировщик маршрутов по Москве</h1>
        <p class="animate-text">Создавайте уникальные маршруты с помощью искусственного интеллекта</p>
        <button class="generate-route-btn animate-btn" (click)="startPlanning()">
          <span class="btn-icon">🗺️</span>
          Создать маршрут
        </button>
      </div>
    </section>

    <section class="themed-routes">
      <h2>Тематические маршруты</h2>
      <div class="routes-grid">
        <div class="route-card">
          <h3>🎨 Арт-маршруты</h3>
          <p>Галереи, стрит-арт, музеи современного искусства</p>
        </div>
        <div class="route-card">
          <h3>🏛️ Исторические маршруты</h3>
          <p>Архитектурные памятники, музеи, исторические места</p>
        </div>
        <div class="route-card">
          <h3>🍽️ Гастрономические туры</h3>
          <p>Рынки, рестораны, кафе с местной кухней</p>
        </div>
      </div>
    </section>

    <section class="seasonal-routes">
      <h2>Маршруты по сезонам</h2>
      <div class="season-cards">
        <div class="season-card winter">
          <h3>❄️ Зимняя Москва</h3>
          <p>Катки, новогодние ярмарки, теплые музеи</p>
        </div>
        <div class="season-card spring">
          <h3>🌸 Весенние прогулки</h3>
          <p>Цветущие парки, фестивали, открытые веранды</p>
        </div>
        <div class="season-card summer">
          <h3>☀️ Летние приключения</h3>
          <p>Парки, фонтаны, речные прогулки</p>
        </div>
        <div class="season-card autumn">
          <h3>🍁 Осенние маршруты</h3>
          <p>Уютные кафе, золотые парки, музеи</p>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./home.component.scss'],
  styles: [`
    .login-container {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      z-index: 10;
    }

    .login-btn {
      padding: 0.6rem 1.2rem;
      border: none;
      border-radius: 2rem;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      color: white;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

      .btn-icon {
        font-size: 1.2rem;
      }

      &:hover {
        background: var(--primary);
        transform: translateY(-2px);
      }
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      padding: 0.4rem 1rem 0.4rem 0.4rem;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      border-radius: 2rem;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

      .avatar-img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid rgba(255, 255, 255, 0.5);
      }

      .user-name {
        font-size: 0.9rem;
        color: white;
        font-weight: 500;
      }

      &:hover {
        background: var(--primary);
        transform: translateY(-2px);
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  showBackButton = false;
  isAuthenticated = false;
  userAvatar = 'assets/default-avatar.png';
  showAuthModal = false;
  isLoginMode = true;
  authForm: FormGroup;
  currentUser: User | null = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private location: Location,
    private authService: AuthService
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  login(): void {
    console.log('Нажата кнопка входа');
    this.router.navigate(['/login']);
  }

  startPlanning(): void {
    console.log('Нажата кнопка создания маршрута');
    this.router.navigate(['/route'])
      .then(() => console.log('Успешная навигация'))
      .catch(err => console.error('Ошибка навигации:', err));
  }

  goBack() {
    this.location.back();
  }

  openProfileMenu() {
    if (!this.isAuthenticated) {
      this.showAuthModal = true;
    } else {
      // Навигация в профиль
    }
  }

  closeAuthModal() {
    this.showAuthModal = false;
  }

  onSubmit() {
    if (this.authForm.valid) {
      // Здесь будет логика аутентификации
      console.log(this.authForm.value);
    }
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}

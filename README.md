# Face ID Attendance System

> **Face ID-based attendance and access management system with Telegram Web App integration.**

Веб-система для автоматизации учета рабочего времени сотрудников, контроля посещаемости и управления электронным турникетом. Система объединяет административную панель, аналитику посещаемости, управление сотрудниками и объектами, журналирование действий и **онлайн-турникет на базе Telegram Web App**.

Главная особенность проекта — сотруднику не требуется отдельное физическое устройство для взаимодействия с системой. Авторизация и фиксация входа/выхода выполняются через **Telegram Web App с использованием камеры телефона и Face ID**.

---

## ✨ Основные возможности

* 🏢 Управление компаниями
* 👨‍💼 Управление директорами и администраторами
* 👥 Управление сотрудниками
* 📍 Управление объектами и геозонами
* 📊 Dashboard с аналитикой посещаемости
* 🕘 Учет входов и выходов сотрудников
* 📱 Онлайн-турникет через Telegram Web App
* 🤳 Face ID / распознавание лица
* 📍 Проверка геолокации сотрудника
* 📋 Журнал всех действий и событий турникета
* 📅 Фильтрация посещаемости по датам и объектам
* 📈 Отчеты и статистика
* 📥 Экспорт данных в Excel
* 🌐 Мультиязычность
* 🔐 Управление доступами сотрудников
* ⚙️ Генерация уникальной ссылки для Telegram Web App

---

# 👤 Роли пользователей

Система разделена на несколько уровней доступа:

| Роль              | Возможности                                           |
| ----------------- | ----------------------------------------------------- |
| **Super Admin**   | Управление компаниями и директорами                   |
| **Director**      | Полное управление своей компанией                     |
| **Company Admin** | Управление сотрудниками, объектами и посещаемостью    |
| **Employee**      | Использование онлайн-турникета через Telegram Web App |

---

# 🛡️ Super Admin

Super Admin отвечает за управление компаниями и директорами в системе.

### Компании

Полный CRUD для компаний:

* создание компании;
* просмотр информации;
* редактирование;
* удаление;
* управление основными данными компании.

### Директора

Super Admin может создавать и управлять директорами:

* создание директора;
* редактирование;
* удаление;
* просмотр информации;
* привязка директора к определенной компании.

Таким образом, каждая компания получает своего ответственного директора, который в дальнейшем работает уже внутри своей панели управления.

---

# 🏢 Company / Director Panel

После авторизации директор получает доступ к панели управления своей компанией.

Панель объединяет все основные инструменты для контроля сотрудников, объектов и посещаемости.

## 📊 Dashboard

Главная страница содержит сводную аналитику по сотрудникам.

На Dashboard отображается:

* общее количество сотрудников;
* количество сотрудников на работе;
* количество отсутствующих сотрудников;
* процент посещаемости;
* статистика входов и выходов;
* актуальная информация о посещаемости.

Dashboard позволяет быстро получить представление о текущем состоянии сотрудников без необходимости просматривать отдельные записи.

---

# 📍 Objects

Модуль объектов предназначен для управления местами, на которых работают сотрудники.

Для объектов предусмотрены полноценные CRUD-операции:

* создание;
* просмотр;
* редактирование;
* удаление;
* настройка рабочего времени;
* настройка параметров объекта;
* привязка сотрудников к объекту.

Также объект используется при проверке местоположения сотрудника во время фиксации посещаемости.

---

# 👥 Employees

Раздел сотрудников позволяет полностью управлять персоналом компании.

### Возможности

* создание сотрудника;
* редактирование данных;
* удаление;
* просмотр информации;
* назначение объекта;
* управление доступами;
* просмотр истории посещаемости;
* работа с фотографией сотрудника.

Каждый сотрудник может быть привязан к определенному объекту, что позволяет системе контролировать не только факт входа, но и соответствие сотрудника рабочему месту.

### 🔐 Employee Access

Для сотрудников предусмотрена система управления доступами.

Администратор может предоставить сотруднику дополнительные права и сделать его **Company Admin**, после чего он получает доступ к административной части системы в соответствии со своими разрешениями.

---

# 🕘 Today's Attendance

Раздел **Today's Attendance** предназначен для оперативного контроля посещаемости за текущий день.

Сотрудники распределяются по текущему статусу:

* **На работе** — сотрудник успешно выполнил вход;
* **Ушел с работы** — сотрудник выполнил выход;
* **Не пришел на работу** — вход не был зафиксирован;
* **Не сделал выход** — сотрудник пришел на работу, но выход не был зафиксирован.

### 🔎 Фильтрация

Посещаемость можно фильтровать:

* по дате;
* по периоду;
* по объекту;
* по сотрудникам;
* по статусу посещения.

Это позволяет быстро находить необходимые записи и анализировать посещаемость конкретного объекта или сотрудника.

### 📥 Export

Данные о посещаемости можно выгружать в **Excel** для дальнейшего анализа, хранения или передачи отчетности.

---

# 📋 Logs

Модуль журналов предназначен для полного аудита событий системы.

В журнале сохраняются действия, связанные с турникетом и посещаемостью сотрудников:

* вход сотрудника;
* выход сотрудника;
* попытки входа;
* попытки выхода;
* результаты Face ID-проверки;
* события, связанные с геолокацией;
* действия пользователей;
* системные события.

Журнал позволяет восстановить историю работы системы и определить, какие события происходили в конкретный момент времени.

Для журнала также предусмотрена фильтрация и экспорт данных в **Excel**.

---

# 📱 Telegram Web App Turnstile

Одной из ключевых особенностей проекта является интеграция с **Telegram Web App**.

Вместо отдельного физического устройства сотрудник использует собственный смартфон.

В настройках компании система генерирует уникальную ссылку, сформированную на основе идентификатора, предоставленного backend.

После перехода по ссылке пользователь попадает в Telegram Web App, где открывается мобильный интерфейс онлайн-турникета.

### Сценарий работы

```text
Company Settings
       ↓
Generate unique link
       ↓
Telegram Web App
       ↓
Employee opens turnstile
       ↓
Camera + Face ID verification
       ↓
Location verification
       ↓
Attendance validation
       ↓
ENTER / EXIT
       ↓
Attendance record
       ↓
Dashboard & Logs
```

Таким образом, Telegram выступает в качестве мобильного интерфейса турникета, а серверная часть отвечает за проверку и фиксацию события.

---

# 🤳 Face ID Verification

Для фиксации посещаемости используется распознавание лица.

Система получает изображение с камеры устройства и отправляет необходимые данные для проверки личности сотрудника.

В процессе фиксации могут учитываться:

* соответствие лица сотруднику;
* процент схожести;
* местоположение;
* привязка сотрудника к объекту;
* текущее состояние посещаемости;
* рабочее время;
* допустимость текущей операции.

После успешной проверки система фиксирует соответствующее событие:

```text
ENTER → сотрудник пришел на работу
EXIT  → сотрудник ушел с работы
```

---

# 📍 Geolocation

Для дополнительной проверки используется геолокация сотрудника.

Система может определить:

* текущие координаты устройства;
* расстояние до объекта;
* нахождение сотрудника в допустимой зоне;
* соответствие сотрудника назначенному объекту.

Это позволяет ограничить фиксацию посещаемости пределами установленной рабочей зоны.

---

# 🌐 Internationalization

Проект поддерживает мультиязычность с использованием **i18n**.

Интерфейс подготовлен таким образом, чтобы текстовые элементы приложения можно было централизованно переводить и переключать между поддерживаемыми языками.

Локализация используется в:

* административной панели;
* формах;
* таблицах;
* уведомлениях;
* статусах;
* Telegram Web App;
* элементах навигации.

---

# 📊 Reporting

Система предоставляет инструменты для формирования и выгрузки отчетности.

Пользователь может анализировать:

* посещаемость сотрудников;
* входы и выходы;
* отсутствие;
* незавершенные рабочие дни;
* данные по объектам;
* историю событий.

Полученные данные можно экспортировать в **Excel** для дальнейшей работы с отчетами.

---

# 🧩 System Architecture

Проект состоит из нескольких взаимосвязанных частей:

```text
                    ┌─────────────────────┐
                    │     Super Admin     │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
            Companies                   Directors
                 │                           │
                 └─────────────┬─────────────┘
                               │
                    ┌──────────▼──────────┐
                    │   Company Panel     │
                    └──────────┬──────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
      Employees             Objects            Dashboard
          │                    │                    │
          └────────────────────┼────────────────────┘
                               │
                        Attendance
                               │
                  ┌────────────┴────────────┐
                  │                         │
             Telegram Web App           Logs
                  │
             Face ID + GPS
                  │
             ENTER / EXIT
```

---

# 🛠️ Tech Stack

### Frontend

* **React**
* **TypeScript**
* **Redux Toolkit**
* **TanStack Query / React Query**
* **Ant Design**
* **React Leaflet**
* **React Webcam**
* **i18next**
* **Telegram Apps SDK**

### Integrations

* **Telegram Web App**
* **Face ID / Face Recognition**
* **Geolocation**
* **Excel Export**
* **Maps / Geofencing**

---

# 🔄 Attendance Flow

Основной сценарий фиксации посещаемости выглядит следующим образом:

```text
Employee
   │
   ▼
Telegram Web App
   │
   ▼
Open Online Turnstile
   │
   ├── Camera
   ├── Face Verification
   └── Geolocation
          │
          ▼
     Backend Validation
          │
     ┌────┴────┐
     │         │
   ENTER      EXIT
     │         │
     └────┬────┘
          ▼
   Attendance Event
          │
     ┌────┴───────────┐
     ▼                ▼
  Dashboard          Logs
     │
     ▼
   Reports
```

---

# 🔐 Access & Control

Система учитывает различные условия перед фиксацией события.

В зависимости от результата проверки система может определить:

* сотрудник находится вне рабочей зоны;
* сотрудник не привязан к объекту;
* вход уже был выполнен;
* выход уже был выполнен;
* сейчас недопустимое рабочее время;
* сотрудник уже завершил рабочий день;
* операция не может быть выполнена повторно.

Это позволяет контролировать корректность посещаемости и предотвращать некорректные или повторные операции.

---

# 🎯 Project Goal

Основная задача проекта — создать единую цифровую систему учета рабочего времени, которая объединяет:

**управление компаниями → сотрудников → объекты → Face ID → геолокацию → Telegram → турникет → посещаемость → аналитику → отчетность.**

Использование Telegram Web App позволяет превратить смартфон сотрудника в персональный интерфейс для взаимодействия с турникетом, исключая необходимость отдельного пользовательского приложения.

---

## 🚀 Key Advantages

* 📱 **Мобильный турникет** — работа через Telegram Web App.
* 🤳 **Face ID** — идентификация сотрудника по лицу.
* 📍 **Geofencing** — дополнительная проверка местоположения.
* 📊 **Analytics** — оперативная статистика посещаемости.
* 📋 **Audit Logs** — история действий и событий.
* 📥 **Excel Reports** — экспорт отчетности.
* 👥 **Role-based Access** — разграничение прав пользователей.
* 🌐 **Multilingual UI** — поддержка нескольких языков.
* ⚡ **Real-time workflow** — оперативная фиксация входов и выходов.

---

Конечно. Ниже — полноценная английская версия README в том же профессиональном стиле, готовая для копирования.

# Face ID Attendance System

> **Face ID-based attendance and access management system with Telegram Web App integration.**

A web-based system designed to automate employee attendance tracking, working hours management, access control, and turnstile operations.

The system combines an administrative dashboard, employee and object management, attendance analytics, audit logs, reporting, and an **online turnstile powered by Telegram Web App**.

The key advantage of the project is that employees do not need a dedicated physical device or separate mobile application. They can use their smartphone and Telegram to access the online turnstile, verify their identity using **Face ID**, and record their entry or exit.

---

# ✨ Key Features

* 🏢 Company management
* 👨‍💼 Director and administrator management
* 👥 Employee management
* 📍 Object and geofence management
* 📊 Attendance analytics dashboard
* 🕘 Employee entry and exit tracking
* 📱 Online turnstile via Telegram Web App
* 🤳 Face ID / face recognition
* 📍 Employee location verification
* 📋 Complete activity and attendance logs
* 📅 Attendance filtering by date and object
* 📈 Reports and analytics
* 📥 Excel export
* 🌐 Multilingual interface
* 🔐 Role-based access management
* ⚙️ Unique Telegram Web App link generation

---

# 👤 User Roles

The system is divided into several access levels:

| Role              | Description                                                       |
| ----------------- | ----------------------------------------------------------------- |
| **Super Admin**   | Manages companies and directors                                   |
| **Director**      | Manages the company's employees, objects, attendance, and reports |
| **Company Admin** | Has administrative access to company management features          |
| **Employee**      | Uses the online turnstile through Telegram Web App                |

---

# 🛡️ Super Admin

The **Super Admin** is responsible for managing companies and directors across the system.

## Companies

The company module provides full CRUD functionality:

* Create companies
* View company information
* Edit company data
* Delete companies
* Manage company details

## Directors

Super Admins can manage company directors:

* Create directors
* Edit director information
* Delete directors
* View director details
* Assign directors to specific companies

Each company can have its own director who manages the company's internal operations.

---

# 🏢 Company / Director Panel

After authentication, the director receives access to the management panel of their company.

The panel provides all the tools required to manage employees, objects, attendance, reports, and system activity.

---

# 📊 Dashboard

The dashboard provides an overview of the company's current attendance status.

It includes:

* Total number of employees
* Employees currently at work
* Employees who have not arrived
* Attendance percentage
* Entry and exit statistics
* Current attendance information
* General employee analytics

The dashboard allows administrators to quickly understand the current attendance situation without manually reviewing individual records.

---

# 📍 Objects

The **Objects** module is used to manage the physical locations where employees work.

Full CRUD operations are available:

* Create objects
* View object information
* Edit objects
* Delete objects
* Configure working hours
* Configure object parameters
* Assign employees to objects

Objects are also used during attendance verification to determine whether an employee is located within the allowed working area.

---

# 👥 Employees

The **Employees** module provides complete employee management.

### Features

* Create employees
* Edit employee information
* Delete employees
* View employee details
* Assign employees to objects
* Manage employee access
* View attendance history
* Manage employee photos

Each employee can be assigned to a specific object, allowing the system to verify both the employee's identity and their assigned workplace.

## 🔐 Employee Access

Administrators can manage employee permissions.

An employee can be granted additional access and promoted to **Company Admin**, giving them access to the administrative panel according to their assigned permissions.

---

# 🕘 Today's Attendance

The **Today's Attendance** module provides real-time visibility into the current attendance status.

Employees are grouped according to their current status:

* **At Work** — the employee has successfully checked in.
* **Left Work** — the employee has successfully checked out.
* **Did Not Arrive** — no check-in was recorded.
* **Did Not Check Out** — the employee checked in but did not record an exit.

## 🔎 Filtering

Attendance records can be filtered by:

* Date
* Date range
* Object
* Employee
* Attendance status

This makes it possible to quickly analyze attendance for a specific employee, object, or period.

## 📥 Excel Export

Attendance data can be exported to **Excel** for further analysis, reporting, archiving, or sharing.

---

# 📋 Logs

The **Logs** module provides a complete audit trail of system and turnstile activity.

The system records events related to employee attendance and turnstile operations, including:

* Employee check-ins
* Employee check-outs
* Check-in attempts
* Check-out attempts
* Face verification results
* Location-related events
* User actions
* System events

The audit log makes it possible to review the history of system activity and identify what happened at a specific time.

Logs can also be filtered and exported to **Excel**.

---

# 📱 Telegram Web App Turnstile

One of the main features of the project is its integration with **Telegram Web App**.

Instead of requiring a dedicated physical turnstile device or separate mobile application, employees can use their own smartphones.

From the system settings, the backend generates a unique link containing a unique identifier.

When the employee opens the link, Telegram launches the **Web App**, where the online turnstile becomes available.

### Workflow

```text
Company Settings
       ↓
Generate Unique Link
       ↓
Telegram Web App
       ↓
Employee Opens Turnstile
       ↓
Camera + Face Verification
       ↓
Location Verification
       ↓
Attendance Validation
       ↓
ENTER / EXIT
       ↓
Attendance Record
       ↓
Dashboard & Logs
```

Telegram acts as the mobile interface for the turnstile, while the backend handles identity verification, validation, and attendance recording.

---

# 🤳 Face ID Verification

Attendance is recorded using face recognition.

The system captures an image from the device camera and sends the required data for identity verification.

During the verification process, the system can validate:

* Employee identity
* Face similarity percentage
* Current location
* Employee-to-object assignment
* Current attendance status
* Working hours
* Whether the requested operation is allowed

After successful verification, the corresponding attendance event is recorded:

```text
ENTER → Employee checked in
EXIT  → Employee checked out
```

---

# 📍 Geolocation

The system also uses device geolocation as an additional attendance verification mechanism.

It can determine:

* Current device coordinates
* Distance to the assigned object
* Whether the employee is inside the allowed area
* Whether the employee is assigned to the current object

This allows the system to restrict attendance operations to predefined working areas.

---

# 🌐 Internationalization

The application supports multiple languages using **i18n**.

The interface is structured so that text content can be centrally translated and switched between supported languages.

Localization is used throughout:

* Administrative dashboard
* Forms
* Tables
* Notifications
* Statuses
* Navigation
* Telegram Web App

---

# 📊 Reporting

The system provides tools for generating and exporting attendance reports.

Administrators can analyze:

* Employee attendance
* Check-ins and check-outs
* Absences
* Incomplete workdays
* Attendance by object
* Employee attendance history
* Turnstile events

The resulting data can be exported to **Excel** for further processing.

---

# 🧩 System Architecture

The project consists of several interconnected modules:

```text
                    ┌─────────────────────┐
                    │     Super Admin     │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
            Companies                   Directors
                 │                           │
                 └─────────────┬─────────────┘
                               │
                    ┌──────────▼──────────┐
                    │   Company Panel     │
                    └──────────┬──────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
      Employees             Objects            Dashboard
          │                    │                    │
          └────────────────────┼────────────────────┘
                               │
                         Attendance
                               │
                  ┌────────────┴────────────┐
                  │                         │
             Telegram Web App           Logs
                  │
             Face ID + GPS
                  │
             ENTER / EXIT
                  │
             Attendance Record
```

---

# 🛠️ Tech Stack

## Frontend

* **React**
* **TypeScript**
* **Redux Toolkit**
* **TanStack Query / React Query**
* **Ant Design**
* **React Leaflet**
* **React Webcam**
* **i18next**
* **Telegram Apps SDK**

## Integrations

* **Telegram Web App**
* **Face Recognition**
* **Geolocation**
* **Excel Export**
* **Maps & Geofencing**

---

# 🔄 Attendance Flow

The main attendance flow works as follows:

```text
Employee
   │
   ▼
Telegram Web App
   │
   ▼
Open Online Turnstile
   │
   ├── Camera
   ├── Face Verification
   └── Geolocation
          │
          ▼
     Backend Validation
          │
     ┌────┴────┐
     │         │
   ENTER      EXIT
     │         │
     └────┬────┘
          ▼
   Attendance Event
          │
     ┌────┴───────────┐
     ▼                ▼
  Dashboard          Logs
     │
     ▼
   Reports
```

---

# 🔐 Access & Validation

Before recording an attendance event, the system validates multiple conditions.

Depending on the result, the system can detect situations such as:

* Employee is outside the allowed geofence
* Employee is not assigned to the object
* Employee has already checked in
* Employee has already checked out
* Current time is outside the allowed attendance window
* Employee has already completed the workday
* The same operation is being submitted too frequently

These validations help prevent duplicate, invalid, or unauthorized attendance operations.

---

# 🎯 Project Goal

The main goal of the project is to create a unified digital attendance and access management platform that combines:

**company management → employees → objects → Face ID → geolocation → Telegram → turnstile → attendance → analytics → reporting.**

By using Telegram Web App, the employee's smartphone becomes a personal interface for interacting with the digital turnstile, eliminating the need for a separate mobile application.

---

# 🚀 Key Advantages

* 📱 **Mobile Turnstile** — access the turnstile through Telegram Web App.
* 🤳 **Face ID** — verify employee identity using face recognition.
* 📍 **Geofencing** — validate the employee's location.
* 📊 **Analytics** — monitor attendance in real time.
* 📋 **Audit Logs** — maintain a complete history of actions and events.
* 📥 **Excel Reports** — export attendance and log data.
* 👥 **Role-Based Access** — manage permissions for different user roles.
* 🌐 **Multilingual UI** — support multiple interface languages.
* ⚡ **Digital Attendance Workflow** — quickly record employee check-ins and check-outs.

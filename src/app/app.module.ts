import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http'; // ✅ Import HttpClientModule

import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { StudentInteractionComponent } from './student-interaction/student-interaction.component';
import { MonetizationComponent } from './monetization/monetization.component';
import { ProfileManagementComponent } from './profile-management/profile-management.component';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { FooterComponent } from './footer/footer.component';
import { UploadContentComponent } from './upload-content/upload-content.component';
import { ViewContentComponent } from './view-content/view-content.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizCreateComponent } from './quiz-create/quiz-create.component';
import { QuizAttemptComponent } from './quiz-attempt/quiz-attempt.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { QuizComponent } from './quiz/quiz.component';
import { StudentListComponent } from './student-list/student-list.component';
import { ClassListComponent } from './class-list/class-list.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { SubmissionsListComponent } from './submissions-list/submissions-list.component';
import { AddSubmissionComponent } from './add-submission/add-submission.component';
import { EditSubmissionComponent } from './edit-submission/edit-submission.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { LessonViewerComponent } from './lesson-viewer/lesson-viewer.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { CertificatesComponent } from './certificates/certificates.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { CommunicationComponent } from './communication/communication.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { GradeListComponent } from './grade-list/grade-list.component';
import { GradeDetailsComponent } from './grade-details/grade-details.component';
import { PerformanceReportsComponent } from './performance-reports/performance-reports.component';
import { CourseEnrollmentComponent } from './course-enrollment/course-enrollment.component';
import { InteractiveLearningContentComponent } from './interactive-learning-content/interactive-learning-content.component';
import { AssignmentSubmissionComponent } from './assignment-submission/assignment-submission.component';
import { InstructorLiveClassesComponent } from './instructor-live-classes/instructor-live-classes.component';
import { DiscussionForumComponent } from './discussion-forum/discussion-forum.component';
import { ProgressComponent } from './progress/progress.component';
import { StudyMaterialsComponent } from './study-materials/study-materials.component';
import { LiveClassesComponent } from './live-classes/live-classes.component';
import { QuizDetailsComponent } from './quiz-details/quiz-details.component';
import { Certificates1Component } from './certificates1/certificates1.component';








@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    CourseManagementComponent,
    StudentInteractionComponent,
    MonetizationComponent,
    ProfileManagementComponent,
    InstructorDashboardComponent,
    StudentDashboardComponent,
    AssignmentComponent,
    AboutPageComponent,
    FooterComponent,
    UploadContentComponent,
    ViewContentComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    QuizListComponent,
    QuizCreateComponent,
    QuizAttemptComponent,
    QuizResultComponent,
    QuizComponent,
    StudentListComponent,
    ClassListComponent,
    DiscussionComponent,
    CoursesListComponent,
    SubmissionsListComponent,
    AddSubmissionComponent,
    EditSubmissionComponent,
    FeedbackComponent,
    RecommendationsComponent,
    LessonViewerComponent,
    SafeUrlPipe,
    CertificatesComponent,
    StudentDetailComponent,
    CommunicationComponent,
    GradeListComponent,
    GradeDetailsComponent,
    PerformanceReportsComponent,
    CourseEnrollmentComponent,
    InteractiveLearningContentComponent,
    AssignmentSubmissionComponent,
    InstructorLiveClassesComponent,
    DiscussionForumComponent,
    ProgressComponent,
    StudyMaterialsComponent,
    LiveClassesComponent,
    QuizDetailsComponent,
    Certificates1Component,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

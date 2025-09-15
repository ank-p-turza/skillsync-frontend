export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>
          <i className="fas fa-tachometer-alt"></i>{" "}
          Dashboard
        </h1>
        <p>Welcome back! Here's your learning overview.</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h3>
              <i className="fas fa-book-reader"></i>{" "}
              My Courses
            </h3>
          </div>
          <div className="card-content">
            <div className="stat-number">3</div>
            <p>Active Courses</p>
            <a href="/enrolled-courses" className="card-link">
              View All <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>
              <i className="fas fa-chart-line"></i>{" "}
              Progress
            </h3>
          </div>
          <div className="card-content">
            <div className="stat-number">67%</div>
            <p>Overall Completion</p>
            <div className="progress-bar">
              <div className="dashboard-progress-fill" style={{ width: '67%' }}></div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>
              <i className="fas fa-trophy"></i>{" "}
              Achievements
            </h3>
          </div>
          <div className="card-content">
            <div className="stat-number">12</div>
            <p>Certificates Earned</p>
            <div className="achievement-badges">
              <span className="badge">🏆</span>
              <span className="badge">📚</span>
              <span className="badge">⭐</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>
              <i className="fas fa-bell"></i>{" "}
              Recent Activity
            </h3>
          </div>
          <div className="card-content">
            <div className="activity-item">
              <p>Completed "React Fundamentals" lesson</p>
              <span className="activity-time">2 hours ago</span>
            </div>
            <div className="activity-item">
              <p>Started "Advanced JavaScript" course</p>
              <span className="activity-time">1 day ago</span>
            </div>
            <a href="/notifications" className="card-link">
              View All <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="continue-learning">
        <h2>Continue Learning</h2>
        <div className="course-progress-cards">
          <div className="progress-card">
            <div className="course-thumbnail">
              <i className="fab fa-react"></i>
            </div>
            <div className="dashboard-course-info">
              <h4>React Development</h4>
              <p>Lesson 8 of 12</p>
              <div className="progress-bar">
                <div className="dashboard-progress-fill" style={{ width: '67%' }}></div>
              </div>
            </div>
            <button className="continue-btn">Continue</button>
          </div>

          <div className="progress-card">
            <div className="course-thumbnail">
              <i className="fab fa-js-square"></i>
            </div>
            <div className="dashboard-course-info">
              <h4>Advanced JavaScript</h4>
              <p>Lesson 3 of 15</p>
              <div className="progress-bar">
                <div className="dashboard-progress-fill" style={{ width: '20%' }}></div>
              </div>
            </div>
            <button className="continue-btn">Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
}
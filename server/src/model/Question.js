export class Question {
  constructor(title, analysis) {
    this.title = title;
    this.analysis = analysis;
    this.createdAt = new Date();
  }
} 
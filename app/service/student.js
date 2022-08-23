const Service = require('egg').Service;

class StudentService extends Service {
  async getSrudentLit() {
    try {
      const studentList = await this.app.model.Student.findAll();
      return studentList;
    } catch (error) {
      return null;
    }
  }
}

module.exports = StudentService;

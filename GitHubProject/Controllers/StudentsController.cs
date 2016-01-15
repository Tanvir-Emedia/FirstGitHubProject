using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using GitHubProject.Models;

namespace GitHubProject.Controllers
{
    public class StudentsController : ApiController
    {
        private WebApiTestDbEntities db = new WebApiTestDbEntities();
        
        // GET: /Students
            
        [HttpGet,Route("Students")]      
        public IQueryable<Student> GetStudents()
        {
            return db.Students;
        }

        // GET: StudentById/1
        
        [HttpGet,Route("StudentById/{id?}"), ResponseType(typeof(Student))]       
        public IHttpActionResult GetStudent(int id)
        {
            Student student = db.Students.Find(id);
            if (student == null)
            {
                return NotFound();
            }

            return Ok(student);
        }

        // PUT: UpdateStudent/2
        
        [HttpPut, Route("UpdateStudent/{id?}"),ResponseType(typeof(void))]    
        public IHttpActionResult PutStudent(int id, Student student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != student.Id)
            {
                return BadRequest();
            }

            db.Entry(student).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: CreateStudent    
        [HttpPost, Route("CreateStudent"),ResponseType(typeof(Student))]       
        public IHttpActionResult PostStudent(Student student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Students.Add(student);
            db.SaveChanges();

            return Ok(student);
        }
        
        //[Route("DeleteStudent/{id?}")]
        // DELETE: DeleteStudent/2
                
        //DELETE: api/Students/DeleteStudentById/14
        [HttpDelete, ActionName("DeleteStudentById"),ResponseType(typeof(Student))]
        public IHttpActionResult DeleteStudent(int id)
        {
            Student student = db.Students.Find(id);
            if (student == null)
            {
                return NotFound();
            }

            db.Students.Remove(student);
            db.SaveChanges();

            return Ok(student);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool StudentExists(int id)
        {
            return db.Students.Count(e => e.Id == id) > 0;
        }
    }
}
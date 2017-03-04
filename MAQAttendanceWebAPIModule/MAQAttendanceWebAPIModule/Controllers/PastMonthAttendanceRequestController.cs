using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MAQAttendanceWebAPIModule.Models;
using System.Data;
using System.Reflection;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Diagnostics;
namespace MAQAttendanceWebAPIModule.Controllers
{
    public class PastMonthAttendanceRequestController : Controller
    {
        public string AttendanceRecords(int id, string currentMonth = null)
        {
           // HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.InternalServerError);
            string json;
            try
            {
                RetrieveAttendanceRecord retrieveAttendanceRecord = new RetrieveAttendanceRecord();
                DataTable attendanceDetails = retrieveAttendanceRecord.GetAttendanceRecord(id, (currentMonth != null) ? currentMonth.Trim() : null);
                IEnumerable<AttendanceDetails> details = ConvertDataTableToList<AttendanceDetails>(attendanceDetails);
                json = JsonConvert.SerializeObject(details);
                return json;
                //response.StatusCode = HttpStatusCode.OK;
                //response.Headers.Add("Access-Control-Allow-Origin", "https://testmaq-my.sharepoint.com");
                //response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
                
                //return response;
            }
            catch (Exception exp)
            {
                if (!EventLog.SourceExists("MAQAttendanceSystem"))
                {
                    EventLog.CreateEventSource("MAQAttendanceSystem", "AttendanceError");
                }
                EventLog.WriteEntry("AttendanceError", exp.Message + "  " + exp.StackTrace + "  " + exp.GetType(), EventLogEntryType.Error);
                return null;
            }
        }

        private static List<T> ConvertDataTableToList<T>(DataTable dt)
        {
            List<T> data = new List<T>();
            foreach (DataRow row in dt.Rows)
            {
                T item = GetItem<T>(row);
                data.Add(item);
            }
            return data;
        }
        private static T GetItem<T>(DataRow dr)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();

            foreach (DataColumn column in dr.Table.Columns)
            {
                foreach (PropertyInfo pro in temp.GetProperties())
                {
                    if (pro.Name == column.ColumnName)
                        pro.SetValue(obj, dr[column.ColumnName].ToString(), null);
                    else
                        continue;
                }
            }
            return obj;
        }
    }
}
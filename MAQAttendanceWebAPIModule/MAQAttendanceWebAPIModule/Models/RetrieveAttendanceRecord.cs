using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data.Sql;
using System.Data.Odbc;
using System.Data;
using System.Configuration;
using System.Diagnostics;

namespace MAQAttendanceWebAPIModule.Models
{
    public class RetrieveAttendanceRecord
    {
        public DataTable GetAttendanceRecord(int employeeID, string currentMonth)
        {
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionName"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("usp_AttendanceRecords", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@EmployeeID", SqlDbType.Int)).Value = employeeID;
                    cmd.Parameters.Add(new SqlParameter("@CurrentMonth", SqlDbType.VarChar)).Value = currentMonth;
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    DataSet ds = new DataSet();
                    da.Fill(ds);
                    DataTable dt = ds.Tables[0];
                    return dt;
                }
            }
        }
    }
}
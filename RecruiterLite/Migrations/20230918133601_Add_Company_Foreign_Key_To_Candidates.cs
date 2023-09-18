using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecruiterLite.Migrations
{
    /// <inheritdoc />
    public partial class Add_Company_Foreign_Key_To_Candidates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Candidates_CompanyId",
                table: "Candidates",
                column: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Candidates_Companies_CompanyId",
                table: "Candidates",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Candidates_Companies_CompanyId",
                table: "Candidates");

            migrationBuilder.DropIndex(
                name: "IX_Candidates_CompanyId",
                table: "Candidates");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecruiterLite.Migrations
{
    /// <inheritdoc />
    public partial class _20230918133601_Add_IsHiringManager_Property_To_Candidate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HiringManagerId",
                table: "Companies");

            migrationBuilder.AddColumn<bool>(
                name: "IsHiringManager",
                table: "Candidates",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsHiringManager",
                table: "Candidates");

            migrationBuilder.AddColumn<int>(
                name: "HiringManagerId",
                table: "Companies",
                type: "int",
                nullable: true);
        }
    }
}

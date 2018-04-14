<Col size="md-6 sm-12">
<h3>Create new Account</h3>
<form>
  <Input
    value={this.state.newUserName}
    onChange={this.handleInputChange}
    name="newUserName"
    placeholder="User Name (required)"
  />
  <Input
    type="password"
    value={this.state.newPassword}
    onChange={this.handleInputChange}
    name="newPassword"
    placeholder="Password (required)"
  />
  <Input
    value={this.state.email}
    onChange={this.handleInputChange}
    name="email"
    placeholder="Email (required)"
  />
  <FormBtn
    disabled={!(this.state.newUserName && this.state.newPassword)}
    onClick={this.handleFormSubmitNewUser}
  >
    Create Account
  </FormBtn>
</form>
</Col>
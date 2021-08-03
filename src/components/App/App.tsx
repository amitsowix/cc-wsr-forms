import React from 'react';
import {
  Layout,
  Cell,
  Card,
  FormField,
  Input,
  Dropdown,
  Page,
  Box,
  Text,
  Breadcrumbs,
  Button,
  WixStyleReactProvider,
  Heading,
  AddItem,
} from 'wix-style-react';

const pages = ['Root Page', 'WSR Form'];

const options = [
  { id: 0, value: 'Red' },
  { id: 1, value: 'Blue' },
  { id: 2, value: 'Green' },
  { id: 3, value: 'Yellow' },
  { id: 4, value: 'Pink' },
];

export default class extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    selectedColor: -1,
    isSubmitted: false,
    submittedFirstName: '',
    submittedLastName: '',
    submittedColor: -1,
  };

  renderHeader() {
    const ActionBar = () => {
      return (
        <Box>
          <Box marginLeft="small" marginRight="small">
            <Button
              disabled={
                !(
                  this.state.firstName !== '' ||
                  this.state.lastName !== '' ||
                  this.state.selectedColor >= 0
                )
              }
              skin="standard"
              dataHook="clear-button"
              priority="secondary"
              onClick={() =>
                this.setState({
                  firstName: '',
                  lastName: '',
                  selectedColor: -1,
                })
              }
            >
              Clear
            </Button>
          </Box>
          <Box>
            <Button
              disabled={
                !(this.state.firstName !== '' && this.state.lastName !== '')
              }
              dataHook="submit-button"
              onClick={() => {
                this.setState({
                  isSubmitted: true,
                  submittedFirstName: this.state.firstName,
                  submittedLastName: this.state.lastName,
                  submittedColor:
                    this.state.selectedColor >= 0
                      ? options[this.state.selectedColor].value
                      : null,
                });
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      );
    };

    return (
      <Page.Header
        title="WSR Form"
        breadcrumbs={
          <Breadcrumbs
            items={[0, 1].map((i) => ({ id: `${i}`, value: pages[i] }))}
            activeId="1"
            size="medium"
            theme="onGrayBackground"
            onClick={() => {}}
          />
        }
        actionsBar={<ActionBar />}
      />
    );
  }

  render() {
    return (
      <WixStyleReactProvider>
        <Page maxWidth={1248}>
          {this.renderHeader()}
          <Page.Content>
            <Layout>
              <Cell span={8} rows={2}>
                <Card>
                  <Card.Header title="General Info" />
                  <Card.Divider />
                  <Card.Content>
                    <Layout>
                      <Cell span={6}>
                        <FormField label="First name" required>
                          <Input
                            onChange={(e) =>
                              this.setState({ firstName: e.target.value })
                            }
                            value={this.state.firstName}
                            dataHook="first-name-input"
                          />
                        </FormField>
                      </Cell>
                      <Cell span={6}>
                        <FormField label="Last name" required>
                          <Input
                            value={this.state.lastName}
                            dataHook="last-name-input"
                            onChange={(e) =>
                              this.setState({ lastName: e.target.value })
                            }
                          />
                        </FormField>
                      </Cell>
                      <Cell>
                        <Heading appearance="H5">Additional Info</Heading>
                      </Cell>
                      <Cell>
                        <FormField label="Favourite color">
                          <Dropdown
                            options={options}
                            placeholder="Choose color"
                            selectedId={this.state.selectedColor}
                            onSelect={(e) => {
                              console.log(e);
                              this.setState({
                                selectedColor: e.id,
                              });
                            }}
                          />
                        </FormField>
                      </Cell>
                      <Cell>
                        <AddItem disabled>Add New List Item</AddItem>
                      </Cell>
                    </Layout>
                  </Card.Content>
                </Card>
              </Cell>
              <Cell span={4}>
                <Card>
                  <Card.Header
                    title="Role Details"
                    suffix={
                      <Button skin="standard" priority="secondary" disabled>
                        Edit
                      </Button>
                    }
                  ></Card.Header>
                  <Card.Divider />
                  <Card.Content>
                    <Layout>
                      <Cell>
                        <Heading appearance="H6">Official Title</Heading>
                        <Text size="medium">Keyboard Annihilator</Text>
                      </Cell>
                      <Cell>
                        <Heading appearance="H6">Experience</Heading>
                        <Text size="medium">It's over nine thousand</Text>
                      </Cell>
                    </Layout>
                  </Card.Content>
                </Card>
              </Cell>
              {this.state.isSubmitted ? (
                <Cell span={4}>
                  <Card>
                    <Card.Header title="Saved Data"></Card.Header>
                    <Card.Divider />
                    <Card.Content>
                      <Layout>
                        <Cell>
                          <Heading appearance="H6">First name</Heading>
                          <Text size="medium" dataHook="submitted-first-name">
                            {this.state.submittedFirstName}
                          </Text>
                        </Cell>
                        <Cell>
                          <Heading appearance="H6">Last name</Heading>
                          <Text size="medium">
                            {this.state.submittedLastName}
                          </Text>
                        </Cell>
                        {this.state.submittedColor ? (
                          <Cell>
                            <Heading appearance="H6">Last name</Heading>
                            <Text size="medium">
                              {this.state.submittedColor}
                            </Text>
                          </Cell>
                        ) : null}
                      </Layout>
                    </Card.Content>
                  </Card>
                </Cell>
              ) : null}
            </Layout>
          </Page.Content>
        </Page>
      </WixStyleReactProvider>
    );
  }
}

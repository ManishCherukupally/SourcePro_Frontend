import { Container, SimpleGrid, Card, Progress, Image, Text } from '@mantine/core'
import React from 'react'

const HomeComp = () => {
  return (
    <div>
      <Container size={"xl"}>
        <h3 style={{ marginBottom: "0.2rem" }}>Continue watching</h3>
        <SimpleGrid cols={4} >
          <Card style={{ margin: "2em", padding: "0" }} withBorder>
            <Card.Section >
              <Image
                src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                height={160}
                width={"100%"}
                alt="Norway"
              />
            </Card.Section>

            <Progress color='yellow' radius={0} value={30} />
            <Card>
              <Text size="sm" color="dimmed">
                With Fjord Tours you can explore more of the magical fjord landscapes with tours and
                activities on and around the fjords of Norway
              </Text>
            </Card>
          </Card>


          <Card style={{ margin: "2em", padding: "0" }} withBorder>
            <Card.Section >
              <Image
                src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                height={160}
                alt="Norway"
              />
            </Card.Section>

            <Progress color='yellow' radius={0} value={50} />
            <Card>
              <Text size="sm" color="dimmed">
                With Fjord Tours you can explore more of the magical fjord landscapes with tours and
                activities on and around the fjords of Norway
              </Text>
            </Card>
          </Card>



          <Card style={{ margin: "2em", padding: "0" }} withBorder>
            <Card.Section >
              <Image
                src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                height={160}
                alt="Norway"
              />
            </Card.Section>

            <Progress color='yellow' radius={0} value={70} />
            <Card>
              <Text size="sm" color="dimmed">
                With Fjord Tours you can explore more of the magical fjord landscapes with tours and
                activities on and around the fjords of Norway
              </Text>
            </Card>
          </Card>


          <Card style={{ margin: "2em", padding: "0" }} withBorder>
            <Card.Section >
              <Image
                src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                height={160}
                alt="Norway"
              />
            </Card.Section>

            <Progress color='yellow' radius={0} value={70} />
            <Card>
              <Text size="sm" color="dimmed">
                With Fjord Tours you can explore more of the magical fjord landscapes with tours and
                activities on and around the fjords of Norway
              </Text>
            </Card>
          </Card>

        </SimpleGrid>
      </Container>
    </div>
  )
}

